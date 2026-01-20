import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AtlasTooltipComponent } from '../../../tooltip/tooltip.component';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-field-hint',
  standalone: true,
  imports: [AtlasTooltipComponent, AtlasTranslationPipe],
  templateUrl: './field-hint.component.html',
  styleUrls: ['./field-hint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasFieldHintComponent {
  @Input() public text?: string;
  @Input() public textKey?: string;
  @Input() public ariaLabel = 'Help';
}
