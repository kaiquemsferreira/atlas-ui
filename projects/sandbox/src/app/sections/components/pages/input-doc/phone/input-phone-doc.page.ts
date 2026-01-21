import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent,
  AtlasTabCardComponent, AtlasTabCardSlotDirective, } from 'atlas-ui-layout';
import { AtlasFormFieldComponent, AtlasPhoneInputComponent, AtlasPhoneValue } from 'atlas-ui-forms';
import { AtlasCodeTabsComponent } from 'atlas-ui-code';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-inputs-phone-input-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasButtonDirective,
    AtlasTabCardComponent,
    AtlasTabCardSlotDirective,
    AtlasFormFieldComponent,
    AtlasPhoneInputComponent,
    AtlasCodeTabsComponent,
  ],
  templateUrl: './input-phone-doc.page.html',
  styleUrls: ['./input-phone-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneDocPage {
  protected isDisabled = false;
  protected phone: AtlasPhoneValue = {};

  protected readonly demoTabs: Array<{ id: string; labelKey?: string; label?: string }> = [
    { id: 'preview', labelKey: 'ui.common.ui.preview' },
    { id: 'code', labelKey: 'ui.common.ui.code' },
  ];
  protected readonly usageHtml = `<atlas-form-field label="Telefone">
  <atlas-phone-input [(value)]="phone"></atlas-phone-input>
</atlas-form-field>`;
  protected readonly usageTs = `import { Component } from '@angular/core';
import { AtlasPhoneValue, AtlasPhoneInputComponent, AtlasFormFieldComponent } from 'atlas-ui-forms';

@Component({
  selector: 'example',
  standalone: true,
  imports: [AtlasFormFieldComponent, AtlasPhoneInputComponent],
  templateUrl: './example.html',
})
export class ExampleComponent {
  phone: AtlasPhoneValue = {};
}`;
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.phoneInput.title' },
  ];
  protected readonly codeTabs = [
    { label: 'HTML', language: 'html', code: this.usageHtml },
    { label: 'TS', language: 'ts', code: this.usageTs },
  ];

  protected toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
