import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, NgZone } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'atlas-popover-panel',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="atlas-popover__panel" [attr.data-placement]="placement" role="dialog" aria-modal="false">
      <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
    </div>
  `,
  styleUrls: ['../component/atlas-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasPopoverPanelComponent implements AfterViewInit {
  @Input({ required: true }) contentTpl!: any;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @HostBinding('attr.data-state') state: 'closed' | 'open' = 'closed';

  constructor(private readonly zone: NgZone, private readonly cdr: ChangeDetectorRef) {}

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
