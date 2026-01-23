import { ElementRef, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export type AtlasOverlayPanelClass = string | string[];

export type AtlasOverlayPosition =
  | { type: 'center' }
  | {
  type: 'connected';
  origin: HTMLElement | ElementRef<HTMLElement>;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  offsetPx?: number;
};

export interface AtlasOverlayConfig<TData = unknown> {
  id?: string;
  data?: TData;
  viewContainerRef?: ViewContainerRef;
  hasBackdrop?: boolean;
  backdropClose?: boolean;
  escClose?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  panelClass?: AtlasOverlayPanelClass;
  backdropClass?: AtlasOverlayPanelClass;
  position?: AtlasOverlayPosition;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export type AtlasOverlayContent<TData = unknown> =
  | { kind: 'component'; component: Type<unknown> }
  | { kind: 'template'; template: TemplateRef<unknown> };
