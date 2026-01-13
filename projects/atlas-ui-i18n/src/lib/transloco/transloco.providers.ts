import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';

import { provideTransloco, provideTranslocoMissingHandler, TranslocoMissingHandler,
  TranslocoMissingHandlerData, TranslocoService } from '@jsverse/transloco';
import { ATLAS_I18N, ATLAS_I18N_CONFIGURATION } from '../api/atlas-i18n.tokens';
import { AtlasI18nConfiguration } from '../api/model/atlas-i18n-configuration';
import { AtlasTranslocoI18nAdapter } from './transloco.adapter';
import { AtlasTranslocoLoader } from './transloco.loader';
import { firstValueFrom } from 'rxjs';

class AtlasMissingHandler implements TranslocoMissingHandler {
  handle(key: string, _data: TranslocoMissingHandlerData) {
    return key;
  }
}

function initAtlasI18n() {
  const transloco = inject(TranslocoService);
  const cfg = inject(ATLAS_I18N_CONFIGURATION);

  return async () => {
    transloco.setActiveLang(cfg.defaultLang);
    await firstValueFrom(transloco.load(cfg.defaultLang));
  };
}

export function provideAtlasI18nTransloco(config: AtlasI18nConfiguration & { prodMode?: boolean }): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const initializerFn = initAtlasI18n();
      return initializerFn();
    }),
    { provide: ATLAS_I18N_CONFIGURATION, useValue: { ...config, uiScope: config.uiScope ?? 'ui' } },
    ...provideTransloco({
      config: {
        availableLangs: config.availableLangs,
        defaultLang: config.defaultLang,
        fallbackLang: config.fallbackLang,
        prodMode: config.prodMode ?? false,
      },
      loader: AtlasTranslocoLoader,
    }),
    provideTranslocoMissingHandler(AtlasMissingHandler),
    AtlasTranslocoI18nAdapter,
    { provide: ATLAS_I18N, useExisting: AtlasTranslocoI18nAdapter },
    TranslocoService,
  ]);
}

