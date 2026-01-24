export type AtlasBadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';

export type AtlasOptionItem<T = unknown> =
  | AtlasOptionRow<T>
  | AtlasOptionDivider
  | AtlasOptionGroup;

export type OptionItem<T> = Extract<AtlasOptionItem<T>, { kind: 'option' }>;

export interface AtlasOptionRow<T = unknown> {
  kind: 'option';
  value: T;
  label?: string;
  labelKey?: string;
  disabled: boolean;
  leftIcon?: string;
  leftImageSrc?: string;
  leftImageAlt?: string;
  badge?: {
    text: string;
    textKey: string;
    tone: AtlasBadgeTone;
  };
}

export interface AtlasOptionDivider {
  kind: 'divider';
}

export interface AtlasOptionGroup {
  kind: 'group';
  label?: string;
  labelKey?: string;
}
