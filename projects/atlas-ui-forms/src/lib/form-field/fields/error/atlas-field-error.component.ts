import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-field-error',
  standalone: true,
  imports: [AtlasTranslationPipe],
  templateUrl: './atlas-field-error.component.html',
  styleUrls: ['./atlas-field-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasFieldErrorComponent {
  @Input() public text?: string;
  @Input() public textKey?: string;
}
