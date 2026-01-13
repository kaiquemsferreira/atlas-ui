import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAtlasI18nContributions, provideAtlasI18nTransloco } from 'atlas-ui-i18n';
import { SANDBOX_PT_BR } from './i18n/sandbox.pt-br';
import { SANDBOX_EN_US } from './i18n/sandbox.en-us';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAtlasI18nContributions({
      'pt-BR': SANDBOX_PT_BR,
      'en-US': SANDBOX_EN_US,
    }),
    provideAtlasI18nTransloco({
      availableLangs: ['pt-BR', 'en-US'],
      defaultLang: 'pt-BR',
      fallbackLang: 'en-US',
      prodMode: false,
      uiScope: 'ui',
    }),
    provideRouter(routes)
  ]
};
