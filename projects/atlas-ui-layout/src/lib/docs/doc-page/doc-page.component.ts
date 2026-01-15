import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AtlasTranslationPipe } from 'atlas-ui-i18n';
import { AtlasBreadcrumbComponent, AtlasBreadcrumbItem } from 'atlas-ui-layout';

@Component({
  selector: 'atlas-doc-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasBreadcrumbComponent
  ],
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
  @Input() public breadcrumbAriaLabel?: string;
  @Input() public breadcrumbAriaLabelKey?: string;
  @Input() public maxWidth: 'md' | 'lg' | 'xl' = 'lg';
  @Input() public breadcrumbItems?: AtlasBreadcrumbItem[];
}
