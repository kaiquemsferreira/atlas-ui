import { AtlasToastAction, AtlasToastPosition, AtlasToastSize } from 'atlas-ui-notifications';

export interface AtlasNotifyOptions {
  title?: string;
  titleKey?: string;
  titleParams?: Record<string, unknown>;
  details?: string;
  detailsKey?: string;
  detailsParams?: Record<string, unknown>;
  position?: AtlasToastPosition;
  actions?: AtlasToastAction[];
  durationMs?: number;
  dismissible?: boolean;
  expanded?: boolean;
  size?: AtlasToastSize;
}
