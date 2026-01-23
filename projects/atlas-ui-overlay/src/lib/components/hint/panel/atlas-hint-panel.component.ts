import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-hint-panel',
  standalone: true,
  imports: [NgTemplateOutlet, AtlasTranslationPipe],
  template: `
    <div class="atlas-hint__panel" [attr.data-placement]="placement" role="tooltip">
      @if (contentTpl) {
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      } @else {
        @if (textKey) { {{ textKey | translate }} }
        @else { {{ text }} }
      }
    </div>
  `,
  styleUrls: ['./atlas-hint-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasHintPanelComponent {
  @Input() text?: string;
  @Input() textKey?: string;
  @Input() contentTpl?: TemplateRef<unknown>;

  @Input() mode: 'tooltip' | 'popover' = 'tooltip';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @HostBinding('attr.data-mode') get dataMode() { return this.mode; }
  @HostBinding('attr.data-state') state: 'open' | 'closed' = 'open';
}
