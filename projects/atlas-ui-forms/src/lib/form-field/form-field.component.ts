import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AtlasPrefixIconDirective } from '../directives/prefix-icon.directive';
import { AtlasInputDirective } from '../directives/input.directive';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-form-field',
  standalone: true,
  imports: [
    AtlasInputDirective,
    AtlasPrefixIconDirective,
    AtlasTranslationPipe
  ],
  templateUrl: './form-field.component.html',
  styleUrls: [
    './form-field.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasFormFieldComponent {
  @Input() hint?: string;
  @Input() label?: string;
  @Input() hintKey?: string;
  @Input() labelKey?: string;
  @Input() floatLabel = false;
}
