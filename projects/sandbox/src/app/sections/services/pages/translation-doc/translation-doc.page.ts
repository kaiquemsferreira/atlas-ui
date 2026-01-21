import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasCodeBlockComponent, AtlasCodeTabsComponent, AtlasSnippetTabsComponent } from 'atlas-ui-code';
import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent } from 'atlas-ui-layout';

@Component({
  selector: 'sandbox-translation-doc-page',
  standalone: true,
  imports: [
    AtlasCodeBlockComponent,
    AtlasCodeTabsComponent,
    AtlasDocSectionComponent,
    AtlasSnippetTabsComponent,
    AtlasDocPageComponent
  ],
  templateUrl: './translation-doc.page.html',
  styleUrls: ['./translation-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationDocPage {
  protected readonly setupCode =`import { provideAtlasI18nTransloco, provideAtlasI18nContributions } from 'atlas-ui-i18n';

...

provideAtlasI18nTransloco({
  availableLangs: ['pt-BR', 'en-US'],
  defaultLang: 'pt-BR',
  fallbackLang: 'en-US',
  prodMode: false,
  uiScope: 'ui',
});

provideAtlasI18nContributions({
  'pt-BR': { sandbox: { ... } },
  'en-US': { sandbox: { ... } },
});`;
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.services', path: '/services' },
    { labelKey: 'sandbox.nav.translation', path: '/components/translation' },
  ];
  protected readonly installTabs = [
    { label: 'pnpm', value: 'pnpm add @jsverse/transloco' },
    { label: 'npm',  value: 'npm i @jsverse/transloco' },
    { label: 'yarn', value: 'yarn add @jsverse/transloco' },
    { label: 'bun',  value: 'bun add @jsverse/transloco' },
  ];
  protected readonly usageTabs = [
    {
      label: 'HTML',
      language: 'html',
      code: `{{ 'sandbox.pages.toast.title' | translate }}`,
    },
    {
      label: 'TS',
      language: 'ts',
      code:
        `this.notifications.successKey('sandbox.pages.toast.successMessage', {
  titleKey: 'ui.components.toast.success',
  actions: [
    { label: { key: 'ui.common.actions.undo' }, closeOnClick: true }
  ]
});`,
    }
  ];
}
