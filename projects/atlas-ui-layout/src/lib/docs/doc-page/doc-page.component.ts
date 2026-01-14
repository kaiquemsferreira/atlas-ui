import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-doc-page',
  standalone: true,
  imports: [AtlasTranslationPipe],
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasDocPageComponent {
  @Input() public title?: string;
  @Input() public titleKey?: string;
  @Input() public subtitle?: string;
  @Input() public breadcrumb?: string;
  @Input() public subtitleKey?: string;
  @Input() public maxWidth: 'md' | 'lg' | 'xl' = 'lg';
}
