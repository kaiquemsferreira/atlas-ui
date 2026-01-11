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
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  closeOnClick?: boolean;
}

export interface AtlasToast {
  id: string;
  variant: AtlasToastVariant;
  title?: string;
  message: string;
  details?: string;
  actions?: AtlasToastAction[];
  durationMs: number;
  dismissible: boolean;
  expanded: boolean;
  size: AtlasToastSize;
  createdAt: number;
  position: AtlasToastPosition;
}
