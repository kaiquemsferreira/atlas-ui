import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasFormFieldComponent, AtlasInputDirective, AtlasPrefixIconDirective } from 'atlas-ui-forms';
import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent } from 'atlas-ui-layout';
import { AtlasInlineCodeComponent, AtlasCodeBlockComponent } from 'atlas-ui-code';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-inputs-doc-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasInlineCodeComponent,
    AtlasCodeBlockComponent,
    AtlasButtonDirective,
    AtlasFormFieldComponent,
    AtlasInputDirective,
    AtlasPrefixIconDirective,
  ],
  templateUrl: './inputs-doc.page.html',
  styleUrls: ['./inputs-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsDocPage {
  protected isDisabled = false;
  protected isInvalid = false;
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.inputs.title' },
  ];

  protected readonly usageHtml = `<atlas-form-field label="Email">
  <input atlas-input type="email" placeholder="email@dominio.com" />
</atlas-form-field>

<atlas-form-field label="Buscar">
  <i atlasPrefixIcon class="ph ph-magnifying-glass"></i>
  <input atlas-input type="text" placeholder="Buscar..." />
</atlas-form-field>

<atlas-form-field label="Nome" [floatLabel]="true">
  <input atlas-input type="text" placeholder=" " />
</atlas-form-field>`;

  protected toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  protected toggleInvalid() {
    this.isInvalid = !this.isInvalid;
  }
}
