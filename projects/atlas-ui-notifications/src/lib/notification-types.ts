import { AtlasButtonColor } from 'atlas-ui-button';

export type AtlasToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';
export type AtlasToastVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type AtlasToastSize = 'sm' | 'md';

export type TimerState = {
  startedAt: number;
  remainingMs: number;
  timeoutId?: number;
  paused: boolean;
};

export interface AtlasToastAction {
  label: AtlasToastText;
  href?: string;
  onClick?: () => void;
  variant?: AtlasButtonColor;
  closeOnClick?: boolean;
}

export type AtlasToastText = | { text: string } | { key: string; params?: Record<string, unknown> };

export interface AtlasToast {
  id: string;
  variant: AtlasToastVariant;
  title?: AtlasToastText;
  message: AtlasToastText;
  details?: AtlasToastText;
  position: AtlasToastPosition;
  actions?: AtlasToastAction[];
  durationMs: number;
  dismissible: boolean;
  expanded: boolean;
  size: AtlasToastSize;
  createdAt: number;
}
