import { InjectionToken } from '@angular/core';

import { AtlasI18nConfiguration } from '../model/atlas-i18n-configuration';
import { AtlasI18nInterface } from '../interface/atlas-i18n-interface';

export const ATLAS_I18N_CONFIGURATION = new InjectionToken<AtlasI18nConfiguration>('ATLAS_I18N_CONFIGURATION');
export const ATLAS_I18N = new InjectionToken<AtlasI18nInterface>('ATLAS_I18N');
