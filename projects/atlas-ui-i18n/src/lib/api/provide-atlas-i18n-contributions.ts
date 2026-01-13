import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { AtlasI18nContributions } from './model/atlas-i18n-contributions';
import { ATLAS_I18N_CONTRIBUTIONS } from './atlas-i18n.contributions';

export function provideAtlasI18nContributions(contributions: AtlasI18nContributions): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ATLAS_I18N_CONTRIBUTIONS, useValue: contributions, multi: true },
  ]);
}
