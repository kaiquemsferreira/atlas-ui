import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, HostBinding, Input,
  NgZone, Output, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';

import { FocusableEl } from '../model/atlas-menu.type';
import { auditTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'atlas-menu-panel',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div #panel class="atlas-menu__panel" role="menu" [attr.aria-label]="ariaLabel">
      <ng-container *ngTemplateOutlet="template; context: ctx"></ng-container>
    </div>
  `,
  styleUrls: ['./atlas-menu-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasMenuPanelComponent implements AfterViewInit {
  @Input() ariaLabel?: string;
  @Input() closeOnSelect = true;
  @Input({ required: true }) template!: TemplateRef<unknown>;

  @Output() requestClose = new EventEmitter<void>();

  @ViewChild('panel', { static: true }) private panelRef!: ElementRef<HTMLElement>;

  @HostBinding('attr.data-state') state: 'open' | 'closed' = 'open';

  private items: FocusableEl[] = [];
  private activeIndex = 0;
  protected ctx = {
    close: () => this.requestClose.emit(),
  };

  constructor(private readonly zone: NgZone, private readonly destroyRef: DestroyRef) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        this.refreshItems();
        this.focusFirst();

        fromEvent<KeyboardEvent>(this.panelEl, 'keydown')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((e) => this.onKeydown(e));

        fromEvent<MouseEvent>(this.panelEl, 'click')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((e) => this.onClick(e));

        fromEvent(this.panelEl, 'transitionend')
          .pipe(auditTime(16), takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.refreshItems());
      });
    });
  }

  private get panelEl(): HTMLElement {
    return this.panelRef.nativeElement;
  }

  private refreshItems(): void {
    const nodes = Array.from(this.panelEl.querySelectorAll<HTMLElement>('[data-atlas-menu-item="true"]'));
    this.items = nodes.filter((el) => !this.isDisabled(el));
    if (this.activeIndex >= this.items.length) this.activeIndex = 0;
    for (const el of nodes) el.tabIndex = -1;
    if (this.items.length) this.items[this.activeIndex].tabIndex = 0;
  }

  private isDisabled(el: HTMLElement): boolean {
    return el.getAttribute('aria-disabled') === 'true' || (el as any).disabled === true;
  }

  private focusFirst(): void {
    this.activeIndex = 0;
    this.applyRoving();
    this.items[0]?.focus({ preventScroll: true });
  }

  private applyRoving(): void {
    for (const el of this.items) el.tabIndex = -1;
    const current = this.items[this.activeIndex];
    if (current) current.tabIndex = 0;
  }

  private move(delta: number): void {
    if (!this.items.length) return;
    this.activeIndex = (this.activeIndex + delta + this.items.length) % this.items.length;
    this.applyRoving();
    this.items[this.activeIndex]?.focus({ preventScroll: true });
  }

  private goTo(index: number): void {
    if (!this.items.length) return;
    this.activeIndex = Math.max(0, Math.min(index, this.items.length - 1));
    this.applyRoving();
    this.items[this.activeIndex]?.focus({ preventScroll: true });
  }

  private onKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.move(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.move(-1);
        break;
      case 'Home':
        e.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        e.preventDefault();
        this.goTo(this.items.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.items[this.activeIndex]?.click();
        break;
      case 'Escape':
        e.preventDefault();
        this.zone.run(() => this.requestClose.emit());
        break;
    }
  }

  private onClick(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const item = target.closest<HTMLElement>('[data-atlas-menu-item="true"]');
    if (!item) return;

    if (this.isDisabled(item)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.closeOnSelect) {
      this.zone.run(() => this.requestClose.emit());
    }
  }
}
