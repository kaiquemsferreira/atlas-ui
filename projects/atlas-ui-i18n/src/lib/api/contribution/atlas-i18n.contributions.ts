import { InjectionToken } from '@angular/core';

import { AtlasI18nContributions } from '../model/atlas-i18n-contributions';

export const ATLAS_I18N_CONTRIBUTIONS = new InjectionToken<AtlasI18nContributions[]>(
  'ATLAS_I18N_CONTRIBUTIONS'
);
