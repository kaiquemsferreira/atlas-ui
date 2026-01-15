import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent } from 'atlas-ui-layout';
import { AtlasButtonDirective, AtlasButtonGroupDirective } from 'atlas-ui-button';
import { AtlasCodeBlockComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-buttons-doc-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasInlineCodeComponent,
    AtlasCodeBlockComponent,
    AtlasButtonDirective,
    AtlasButtonGroupDirective,
  ],
  templateUrl: './buttons-doc.page.html',
  styleUrls: ['./buttons-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsDocPage {
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.buttons.title' }
  ];
  protected loading = false;

  protected readonly usageHtml =
    `<button atlas-button variant="solid" color="primary">
  <i class="ph ph-download"></i>
  Export
</button>

<button atlas-button iconOnly aria-label="Edit">
  <i class="ph ph-pencil"></i>
</button>

<div atlas-button-group>
  <button atlas-button variant="outline" color="surface">Documents</button>
  <button atlas-button variant="outline" color="surface">
    <i class="ph ph-export"></i> Export
  </button>
  <button atlas-button variant="outline" color="surface" iconOnly aria-label="More">
    <i class="ph ph-dots-three"></i>
  </button>
</div>`;

  protected readonly typesTs = `export type AtlasButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type AtlasButtonColor =
  | 'primary'
  | 'surface'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'gradient';
export type AtlasButtonSize = 'sm' | 'md' | 'lg';`;

  protected toggleLoading() {
    this.loading = !this.loading;
  }
}
