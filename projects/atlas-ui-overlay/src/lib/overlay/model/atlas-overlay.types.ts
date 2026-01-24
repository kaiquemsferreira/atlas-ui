import { Injector, StaticProvider, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export type AtlasOverlayPanelClass = string | string[];

export type AtlasOverlayPlacement = 'top' | 'bottom' | 'left' | 'right';
export type AtlasOverlayAlign = 'start' | 'center' | 'end';

export type AtlasOverlayPosition =
  | { type: 'center' }
  | AtlasOverlayConnectedPosition;

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
  title?: string;
  injector?: Injector;
  providers?: StaticProvider[];
}

export interface AtlasOverlayConnectedPosition {
  type: 'connected';
  origin: HTMLElement;
  placement: AtlasOverlayPlacement;
  align?: AtlasOverlayAlign;
  offsetPx?: number;
  flip?: boolean;
  viewportPaddingPx?: number;
  matchWidth?: boolean;
}

export type AtlasOverlayContent<TData = unknown> =
  | { kind: 'component'; component: Type<unknown> }
  | { kind: 'template'; template: TemplateRef<unknown> };
