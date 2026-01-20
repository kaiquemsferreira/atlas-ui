import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent, AtlasTabCardComponent, AtlasTabCardSlotDirective } from 'atlas-ui-layout';
import { AtlasDatePickerComponent, AtlasDateRange, AtlasFormFieldComponent } from 'atlas-ui-forms';
import { AtlasCodeTab, AtlasCodeTabsComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

type CodeTab = {
  id: 'html' | 'ts';
  labelKey: string;
  language: 'html' | 'ts';
  code: string;
};

@Component({
  selector: 'sandbox-inputs-date-picker-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasButtonDirective,
    AtlasInlineCodeComponent,
    AtlasFormFieldComponent,
    AtlasDatePickerComponent,
    AtlasTabCardComponent,
    AtlasTabCardSlotDirective,
    AtlasCodeTabsComponent,
  ],
  templateUrl: './input-date-picker-doc.page.html',
  styleUrls: ['./input-date-picker-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDatePickerDocPage {
  protected single?: Date;
  protected range: AtlasDateRange = {};
  protected isDisabled = false;
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.datePicker.title' },
  ];
  protected readonly demoTabs: Array<{ id: string; labelKey?: string; label?: string }> = [
    { id: 'preview', labelKey: 'ui.common.preview' },
    { id: 'code', labelKey: 'ui.common.code' },
  ];

  protected readonly minDate = new Date();

  protected readonly usageHtml = `<atlas-form-field label="Date (single)">
  <atlas-date-picker [(value)]="single"></atlas-date-picker>
</atlas-form-field>

<atlas-form-field label="Date (range)">
  <atlas-date-picker mode="range" [(value)]="range"></atlas-date-picker>
</atlas-form-field>`;

  protected readonly usageTs = `import { Component } from '@angular/core';
import { AtlasDateRange } from 'atlas-ui-forms';

@Component({
  selector: 'example',
  standalone: true,
  templateUrl: './example.html',
})
export class ExampleComponent {
  single?: Date;
  range: AtlasDateRange = {};
}`;

  protected readonly codeTabs: AtlasCodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: this.usageHtml,
    },
    {
      label: 'TS',
      language: 'ts',
      code: this.usageTs,
    },
  ];

  protected toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
