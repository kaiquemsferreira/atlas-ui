import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, DestroyRef, Input, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AtlasMenuTemplateDirective } from '../directive/atlas-menu-template.directive';
import { AtlasMenuTriggerDirective } from '../directive/atlas-menu-trigger.directive';
import { AtlasOverlayService } from '../../overlay/service/atlas-overlay.service';
import { AtlasOverlayPosition } from '../../overlay/model/atlas-overlay.types';
import { AtlasMenuPanelComponent } from '../panel/atlas-menu-panel.component';
import { AtlasOverlayRef } from '../../overlay/service/atlas-overlay-ref';
import { Placement } from '../../tooltip/model/placement.type';
import { Align } from '../../tooltip/model/align.type';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'atlas-menu',
  standalone: true,
  imports: [],
  templateUrl: './atlas-menu.component.html',
  styleUrls: ['./atlas-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasMenuComponent implements AfterViewInit {
  @Input() ariaLabel?: string;
  @Input() offsetPx = 8;
  @Input() align: Align = 'start';
  @Input() disabled = false;
  @Input() onRequestClose?: () => void;
  @Input() closeOnSelect = true;
  @Input() placement: Placement = 'bottom';

  @ContentChild(AtlasMenuTriggerDirective, { static: true })
  private triggerDir!: AtlasMenuTriggerDirective;

  @ContentChild(AtlasMenuTemplateDirective, { static: true })
  private menuTplDir!: AtlasMenuTemplateDirective;

  private overlayRef: AtlasOverlayRef | null = null;

  constructor(private readonly overlay: AtlasOverlayService,
              private readonly destroyRef: DestroyRef,
              private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    const triggerEl = this.triggerDir.elRef.nativeElement;
    triggerEl.setAttribute('aria-haspopup', 'menu');

    triggerEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });

    this.zone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(document, 'mousedown', { capture: true } as any)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((evt) => this.onOutsideClick(evt));

      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((e) => {
          if (!this.overlayRef) return;
          if (e.key === 'Escape') this.zone.run(() => this.close());
        });
    });
  }

  private toggle(): void {
    if (this.disabled) return;
    this.overlayRef ? this.close() : this.open();
  }

  private open(): void {
    if (this.disabled || this.overlayRef) return;

    const position: AtlasOverlayPosition = {
      type: 'connected',
      origin: this.triggerDir.elRef.nativeElement,
      placement: this.placement,
      align: this.align,
      offsetPx: this.offsetPx,
    };

    this.overlayRef = this.overlay.open(AtlasMenuPanelComponent, {
      hasBackdrop: false,
      backdropClose: false,
      escClose: false,
      position,
      panelClass: ['atlas-menu-overlay'],
    });

    const ref = this.overlayRef.contentRef;
    if (ref) {
      ref.setInput('template', this.menuTplDir.template);
      ref.setInput('closeOnSelect', this.closeOnSelect);
      ref.setInput('ariaLabel', this.ariaLabel);
      ref.setInput('onRequestClose', () => this.close());
      ref.changeDetectorRef.detectChanges();
    }

    this.triggerDir.elRef.nativeElement.setAttribute('aria-expanded', 'true');

    this.overlayRef.afterClosed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.triggerDir.elRef.nativeElement.setAttribute('aria-expanded', 'false');
        this.overlayRef = null;
      });
  }

  private close(): void {
    this.overlayRef?.close();
    this.overlayRef = null;
    this.triggerDir.elRef.nativeElement.setAttribute('aria-expanded', 'false');
  }

  private onOutsideClick(evt: MouseEvent): void {
    if (!this.overlayRef) return;

    const t = evt.target as Node | null;
    if (!t) return;

    const triggerEl = this.triggerDir.elRef.nativeElement;
    const panelEl = this.overlayRef.panelEl;

    if (triggerEl.contains(t)) return;
    if (panelEl.contains(t)) return;

    this.zone.run(() => this.close());
  }
}
