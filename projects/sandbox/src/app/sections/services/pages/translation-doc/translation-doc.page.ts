import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AtlasCardComponent } from 'atlas-ui-layout';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-translation-doc-page',
  standalone: true,
  imports: [AtlasCardComponent, AtlasTranslationPipe],
  templateUrl: './translation-doc.page.html',
  styleUrls: ['./translation-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationDocPage {
  protected readonly installCode = `npm i @jsverse/transloco`;
  protected readonly setupCode = `import { provideAtlasI18nTransloco, provideAtlasI18nContributions } from 'atlas-ui-i18n';

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
  protected readonly usageCode = `// TS
this.notifications.successKey('sandbox.pages.toast.successMessage', {
  titleKey: 'ui.components.toast.success',
  actions: [
    { label: { key: 'ui.common.undo' }, closeOnClick: true }
  ]
});

// HTML
{{ 'sandbox.pages.toast.title' | translate }}`;
}
