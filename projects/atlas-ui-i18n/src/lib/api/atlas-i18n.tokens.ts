import { InjectionToken } from '@angular/core';

import { AtlasI18nConfiguration } from './model/atlas-i18n-configuration';
import { AtlasI18n } from './atlas-i18n';

export const ATLAS_I18N_CONFIGURATION = new InjectionToken<AtlasI18nConfiguration>('ATLAS_I18N_CONFIGURATION');
export const ATLAS_I18N = new InjectionToken<AtlasI18n>('ATLAS_I18N');
