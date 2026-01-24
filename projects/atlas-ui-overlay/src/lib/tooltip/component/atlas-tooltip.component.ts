import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AtlasTooltipTriggerDirective } from '../directive/atlas-tooltip-trigger.directive';
import { AtlasTooltipContentDirective } from '../directive/atlas-tooltip-content.directive';
import { AtlasTooltipPanelComponent } from '../panel/atlas-tooltip-panel.component';
import { AtlasOverlayService } from '../../overlay/service/atlas-overlay.service';
import { AtlasOverlayPosition } from '../../overlay/model/atlas-overlay.types';
import { AtlasOverlayRef } from '../../overlay/service/atlas-overlay-ref';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'atlas-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './atlas-tooltip.component.html',
  styleUrls: ['./atlas-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasTooltipComponent implements AfterViewInit {
  @ContentChild(AtlasTooltipTriggerDirective, { static: true })
  private triggerDir!: AtlasTooltipTriggerDirective;

  @ContentChild(AtlasTooltipContentDirective, { static: true })
  private contentDir!: AtlasTooltipContentDirective;

  private overlayRef: AtlasOverlayRef | null = null;

  constructor(private readonly overlay: AtlasOverlayService,
              private readonly destroyRef: DestroyRef) {}

  ngAfterViewInit(): void {
    const el = this.triggerDir.elRef.nativeElement;

    el.addEventListener('mouseenter', () => this.show());
    el.addEventListener('mouseleave', () => this.hide());
    el.addEventListener('focusin', () => this.show());
    el.addEventListener('focusout', () => this.hide());

    takeUntilDestroyed(this.destroyRef)(fromEvent(el, 'destroy' as any)).subscribe();
  }

  private show(): void {
    if (this.overlayRef) return;

    const position: AtlasOverlayPosition = {
      type: 'connected',
      origin: this.triggerDir.elRef.nativeElement,
      placement: 'bottom',
      align: 'center',
      offsetPx: 8,
    };

    this.overlayRef = this.overlay.open(AtlasTooltipPanelComponent, {
      hasBackdrop: false,
      escClose: false,
      backdropClose: false,
      position,
      panelClass: 'atlas-tooltip-overlay',
      data: {
        contentTpl: this.contentDir.template,
        placement: position.placement ?? 'bottom',
      },
    });

    const ref = this.overlayRef.contentRef;
    if (ref) {
      ref.setInput('contentTpl', this.contentDir.template);
      ref.setInput('placement', position.placement ?? 'bottom');
      ref.changeDetectorRef.detectChanges();
    }

    this.overlayRef.afterClosed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.overlayRef = null;
    });
  }

  private hide(): void {
    this.overlayRef?.close();
    this.overlayRef = null;
  }
}
