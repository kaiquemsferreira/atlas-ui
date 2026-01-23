import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';

import { AtlasPrefixIconDirective } from './directives/prefix-icon.directive';
import { AtlasSuffixDirective } from './directives/suffix.directive';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-form-field',
  standalone: true,
  imports: [AtlasTranslationPipe],
  templateUrl: './atlas-form-field.component.html',
  styleUrls: ['./atlas-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasFormFieldComponent {
  @Input() public hint?: string;
  @Input() public label?: string;
  @Input() public hintKey?: string;
  @Input() public labelKey?: string;
  @Input() public invalid = false;
  @Input() public floatLabel = false;
  @ContentChild(AtlasSuffixDirective) suffix?: AtlasSuffixDirective;
  @ContentChild(AtlasPrefixIconDirective) prefix?: AtlasPrefixIconDirective;

  get hasPrefix(): boolean { return !!this.prefix }

  get hasSuffix(): boolean { return !!this.suffix }
}
