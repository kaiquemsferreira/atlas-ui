import { InjectionToken } from '@angular/core';

export const ATLAS_OVERLAY_CONTAINER_ID = new InjectionToken<string>(
  'ATLAS_OVERLAY_CONTAINER_ID',
  { providedIn: 'root', factory: () => 'atlas-overlay-root' }
);
