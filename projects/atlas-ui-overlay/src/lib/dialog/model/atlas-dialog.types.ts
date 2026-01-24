import { TemplateRef, Type } from '@angular/core';

export type AtlasDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'auto';
export type AtlasAlign = 'start' | 'center' | 'end' | 'space-between';

export interface AtlasDialogAction<TResult = unknown> {
  text?: string;
  textKey?: string;
  icon?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'surface' | 'error' | 'success';
  disabled?: boolean;

  autoFocus?: boolean;
  closeOnClick?: boolean;
  closeValue?: TResult;

  onClick?: (ctx: {
    action: AtlasDialogAction<TResult>;
    close: (value?: TResult) => void;
  }) => void | Promise<void>;

  tpl?: TemplateRef<{
    $implicit: AtlasDialogAction<TResult>;
    close: (value?: TResult) => void;
  }>;

  ariaLabel?: string;
  class?: string | string[];
}

export interface AtlasDialogConfig<TData = unknown, TResult = unknown> {
  id?: string;
  data?: TData;
  ariaLabel?: string;
  title?: string;
  titleKey?: string;
  titleTpl?: TemplateRef<unknown>;
  headerAlign?: AtlasAlign;
  closeButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
  lockScroll?: boolean;
  size?: AtlasDialogSize;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  panelClass?: string | string[];
  backdropClass?: string | string[];
  footerTpl?: TemplateRef<unknown>;
  footerActions?: AtlasDialogAction<TResult>[];
  footerAlign?: AtlasAlign;
}

export type AtlasDialogContent<TComponent = unknown> =
  | { kind: 'component'; component: Type<TComponent> }
  | { kind: 'template'; template: TemplateRef<unknown> };
