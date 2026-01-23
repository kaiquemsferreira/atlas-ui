import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, DestroyRef, Input, NgZone, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AtlasPopoverAlign, AtlasPopoverMode, AtlasPopoverPlacement } from './model/atlas-popover.type';
import { AtlasPopoverTriggerDirective } from './directive/popover-trigger.directive';
import { AtlasPopoverContentDirective } from './directive/popover-content.directive';
import { AtlasPopoverPanelComponent } from './panel/atlas-popover-panel.component';
import { fromEvent, merge, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { AtlasOverlayRef } from '../../service/atlas-overlay-ref';
import { AtlasOverlayService } from '../../service/atlas-overlay.service';
import { AtlasOverlayPosition } from '../../model/atlas-overlay.types';

@Component({
  selector: 'atlas-popover',
  standalone: true,
  imports: [],
  templateUrl: './atlas-popover.component.html',
  styleUrls: ['./atlas-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasPopoverComponent implements AfterViewInit, OnDestroy {
  @Input() offsetPx = 8;
  @Input() disabled = false;
  @Input() closeOnEsc = true;
  @Input() mode: AtlasPopoverMode = 'click';
  @Input() closeOnOutsideClick = true;
  @Input() align: AtlasPopoverAlign = 'center';
  @Input() placement: AtlasPopoverPlacement = 'bottom';

  @ContentChild(AtlasPopoverTriggerDirective, { static: true })
  private triggerDir!: AtlasPopoverTriggerDirective;

  @ContentChild(AtlasPopoverContentDirective, { static: true })
  private contentDir!: AtlasPopoverContentDirective;

  private overlayRef: AtlasOverlayRef | null = null;
  private subs = new Subscription();

  constructor(private readonly overlay: AtlasOverlayService,
              private readonly destroyRef: DestroyRef,
              private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    const triggerEl = this.triggerDir.elRef.nativeElement;
    triggerEl.setAttribute('aria-haspopup', 'dialog');

    if (this.mode === 'click') {
      triggerEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    } else {
      triggerEl.addEventListener('mouseenter', () => this.open());
      triggerEl.addEventListener('mouseleave', () => this.scheduleCloseOnHoverLeave());
      triggerEl.addEventListener('focusin', () => this.open());
      triggerEl.addEventListener('focusout', () => this.close());
    }

    this.zone.runOutsideAngular(() => {
      const docClick$ = fromEvent<MouseEvent>(document, 'mousedown', { capture: true } as any);
      const esc$ = fromEvent<KeyboardEvent>(document, 'keydown');

      this.subs.add(
        docClick$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((e) => this.onDocPointer(e))
      );

      this.subs.add(
        esc$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((e) => {
          if (!this.overlayRef) return;
          if (!this.closeOnEsc) return;
          if (e.key === 'Escape') this.zone.run(() => this.close());
        })
      );

      this.subs.add(
        merge(fromEvent(globalThis, 'resize'), fromEvent(globalThis, 'scroll', { capture: true } as any))
          .pipe(auditTime(16), takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {})
      );
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.overlayRef?.close();
    this.overlayRef = null;
  }

  private toggle(): void {
    if (this.disabled) return;
    if (this.overlayRef) this.close();
    else this.open();
  }

  private open(): void {
    if (this.disabled) return;
    if (this.overlayRef) return;

    const position: AtlasOverlayPosition = {
      type: 'connected',
      origin: this.triggerDir.elRef.nativeElement,
      placement: 'bottom',
      align: 'center',
      offsetPx: 8,
    };

    this.overlayRef = this.overlay.open(AtlasPopoverPanelComponent, {
      hasBackdrop: false,
      escClose: false,
      backdropClose: false,
      position,
      panelClass: ['atlas-popover-overlay'],
    });

    const ref = this.overlayRef.contentRef;
    if (ref) {
      ref.setInput('contentTpl', this.contentDir.template);
      ref.setInput('placement', position.placement ?? 'bottom');
      ref.changeDetectorRef.detectChanges();
    }

    this.triggerDir.elRef.nativeElement.setAttribute('aria-expanded', 'true');

    this.overlayRef.afterClosed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.triggerDir.elRef.nativeElement.setAttribute('aria-expanded', 'false');
      this.overlayRef = null;
    });
  }

  private close(): void {
    this.overlayRef?.close();
    this.overlayRef = null;
    this.triggerDir.elRef.nativeElement.setAttribute('aria-expanded', 'false');
  }

  private onDocPointer(e: MouseEvent): void {
    if (!this.overlayRef) return;
    if (!this.closeOnOutsideClick) return;

    const target = e.target as Node | null;
    if (!target) return;

    const triggerEl = this.triggerDir.elRef.nativeElement;
    const panelEl = this.overlayRef.panelEl;

    if (triggerEl.contains(target)) return;
    if (panelEl.contains(target)) return;

    this.zone.run(() => this.close());
  }

  private scheduleCloseOnHoverLeave(): void {
    if (this.mode !== 'hover') return;
    if (!this.overlayRef) return;

    const panelEl = this.overlayRef.panelEl;

    const t = globalThis.setTimeout(() => {
      if (!this.overlayRef) return;

      const isHoveringPanel = panelEl.matches(':hover');
      const isHoveringTrigger = this.triggerDir.elRef.nativeElement.matches(':hover');

      if (!isHoveringPanel && !isHoveringTrigger) {
        this.zone.run(() => this.close());
      }
    }, 80);

    panelEl.addEventListener(
      'mouseenter',
      () => {
        globalThis.clearTimeout(t);
      },
      { once: true }
    );

    panelEl.addEventListener(
      'mouseleave',
      () => {
        this.zone.run(() => this.close());
      },
      { once: true }
    );
  }
}
