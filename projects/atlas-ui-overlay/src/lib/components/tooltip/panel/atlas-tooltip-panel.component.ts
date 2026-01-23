import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  HostBinding, Input, NgZone } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'atlas-tooltip-panel',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <span class="atlas-tooltip__panel" [attr.data-placement]="placement" role="tooltip">
      <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      <span class="atlas-tooltip__arrow" aria-hidden="true"></span>
    </span>
  `,
  styleUrls: ['../atlas-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasTooltipPanelComponent implements AfterViewInit {
  @Input({ required: true }) contentTpl!: any;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @HostBinding('attr.data-state') state: 'closed' | 'open' = 'closed';

  constructor(private readonly cdr: ChangeDetectorRef,
              private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.zone.run(() => {
              this.state = 'open';
              this.cdr.markForCheck();
            });
          });
        });
      });
    });
  }
}
