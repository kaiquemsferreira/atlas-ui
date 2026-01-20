import { InjectionToken } from '@angular/core';

import { AtlasCardDefaults } from './atlas-card-defaults';

export const ATLAS_CARD_DEFAULTS = new InjectionToken<AtlasCardDefaults>('ATLAS_CARD_DEFAULTS', {
  factory: () => ({
    variant: 'default',
    padding: 'md',
  }),
});
