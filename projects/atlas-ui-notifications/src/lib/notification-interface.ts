import { AtlasToastAction, AtlasToastPosition, AtlasToastSize } from 'atlas-ui-notifications';

export interface AtlasNotifyOptions {
  title?: string;
  durationMs?: number;
  dismissible?: boolean;
  details?: string;
  position?: AtlasToastPosition;
  expanded?: boolean;
  size?: AtlasToastSize;
  actions?: AtlasToastAction[];
}
