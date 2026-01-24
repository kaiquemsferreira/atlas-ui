import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, DestroyRef, ElementRef, Input, TemplateRef,
  ViewChild, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AtlasHintContentDirective, AtlasOverlayService } from 'atlas-ui-overlay';
import { AtlasHintPanelComponent } from '../panel/atlas-hint-panel.component';
import { Placement } from '../../tooltip/model/placement.type';
import { AtlasOverlayPosition } from 'atlas-ui-overlay';
import { Align } from '../../tooltip/model/align.type';
import { AtlasOverlayRef } from 'atlas-ui-overlay';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'atlas-field-hint',
  standalone: true,
  imports: [],
  templateUrl: './atlas-field-hint.component.html',
  styleUrls: ['./atlas-field-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasFieldHintComponent implements AfterViewInit {
  @ViewChild('trigger', { static: true }) private triggerEl!: ElementRef<HTMLElement>;

  @Input() text?: string;
  @Input() textKey?: string;
  @Input() offsetPx = 8;
  @Input() align: Align = 'center';
  @Input() disabled = false;
  @Input() ariaLabel = 'Help';
  @Input() placement: Placement = 'bottom';
  @Input() mode: 'tooltip' | 'popover' = 'tooltip';


  @ContentChild(TemplateRef) private projectedTpl?: TemplateRef<unknown>;
  @ContentChild(AtlasHintContentDirective) private hintDir?: AtlasHintContentDirective;

  private overlayRef: AtlasOverlayRef | null = null;

  constructor(
    private readonly overlay: AtlasOverlayService,
    private readonly destroyRef: DestroyRef,
    private readonly zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    const el = this.triggerEl.nativeElement;

    if (this.mode === 'tooltip') {
      el.addEventListener('mouseenter', () => this.open());
      el.addEventListener('mouseleave', () => this.close());
      el.addEventListener('focusin', () => this.open());
      el.addEventListener('focusout', () => this.close());
      return;
    }

    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.overlayRef ? this.close() : this.open();
    });

    this.zone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(document, 'mousedown', { capture: true } as any)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((evt) => this.onOutsideClick(evt));
    });
  }

  private onOutsideClick(evt: MouseEvent): void {
    if (!this.overlayRef || this.mode !== 'popover') return;

    const t = evt.target as Node | null;
    if (!t) return;

    if (this.triggerEl.nativeElement.contains(t)) return;
    if (this.overlayRef.panelEl.contains(t)) return;

    this.zone.run(() => this.close());
  }

  private open(): void {
    if (this.disabled || this.overlayRef) return;

    const position: AtlasOverlayPosition = {
      type: 'connected',
      origin: this.triggerEl.nativeElement,
      placement: this.placement,
      align: this.align,
      offsetPx: this.offsetPx,
    };

    this.overlayRef = this.overlay.open(AtlasHintPanelComponent, {
      hasBackdrop: this.mode === 'popover',
      backdropClose: this.mode === 'popover',
      escClose: this.mode === 'popover',
      position,
      panelClass: ['atlas-hint-overlay'],
    });

    const ref = this.overlayRef.contentRef;
    if (ref) {
      const tpl = this.hintDir?.template
        ?? (this.mode === 'popover' ? this.projectedTpl : undefined);


      ref.setInput('contentTpl', tpl);
      ref.setInput('text', this.text);
      ref.setInput('textKey', this.textKey);
      ref.setInput('mode', this.mode);
      ref.setInput('placement', this.placement);
      ref.changeDetectorRef.detectChanges();
    }

    this.overlayRef.afterClosed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => (this.overlayRef = null));
  }

  private close(): void {
    this.overlayRef?.close();
    this.overlayRef = null;
  }
}
