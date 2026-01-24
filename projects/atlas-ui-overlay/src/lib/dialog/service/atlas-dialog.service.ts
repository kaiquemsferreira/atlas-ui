import { ApplicationRef, EnvironmentInjector, Injectable, Injector, TemplateRef, Type } from '@angular/core';

import { AtlasDialogContainerComponent } from '../component/atlas-dialog-container.component';
import { AtlasOverlayService } from '../../overlay/service/atlas-overlay.service';
import { AtlasOverlayPosition } from '../../overlay/model/atlas-overlay.types';
import { AtlasDialogConfig, AtlasDialogContent } from '../model/atlas-dialog.types';
import { ATLAS_DIALOG_DATA } from '../token/atlas-dialog.token';
import { captureFocusRestore } from '../util/focus-restore';
import { AtlasDialogRef } from './atlas-dialog-ref';
import { lockBodyScroll } from '../util/scroll-lock';

@Injectable({ providedIn: 'root' })
export class AtlasDialogService {
  constructor(private readonly overlay: AtlasOverlayService, private readonly envInjector: EnvironmentInjector,
              private readonly appRef: ApplicationRef, private readonly injector: Injector) { }

  open<TResult = unknown, TData = unknown>(content: AtlasDialogContent,
    config: AtlasDialogConfig<TData, TResult> = {}): AtlasDialogRef<TResult> {
    if (content.kind === 'template') {
      return this.openTemplate<TResult, TData>(content.template, config);
    }
    return this.openComponent<any, TResult, TData>(content.component, config);
  }


  openTemplate<TResult = unknown, TData = unknown>(template: TemplateRef<unknown>,
    config: AtlasDialogConfig<TData, TResult> = {}): AtlasDialogRef<TResult> {
    const id = config.id ?? this.makeId();

    const restoreFocus = (config.restoreFocus ?? true) ? captureFocusRestore() : null;
    const unlockScroll = (config.lockScroll ?? true) ? lockBodyScroll() : null;

    const position: AtlasOverlayPosition = { type: 'center' };

    const overlayRef = this.overlay.open(AtlasDialogContainerComponent, {
      id,
      hasBackdrop: true,
      backdropClose: config.closeOnBackdrop ?? true,
      escClose: config.closeOnEsc ?? true,
      position,
      width: config.width,
      height: config.height,
      maxWidth: config.maxWidth ?? 'calc(100vw - 24px)',
      maxHeight: config.maxHeight ?? 'calc(100vh - 24px)',
      panelClass: ['atlas-dialog-overlay', ...(toArray(config.panelClass))],
      backdropClass: ['atlas-dialog-backdrop', ...(toArray(config.backdropClass))],
      data: null,
    });

    overlayRef.panelEl?.setAttribute?.('data-state', 'open');

    const dialogRef = new AtlasDialogRef<TResult>(
      overlayRef,
      id,
      overlayRef.contentRef ?? null,
      restoreFocus,
      unlockScroll
    );

    const ref = overlayRef.contentRef;
    if (ref) {
      ref.setInput('contentTpl', template);
      ref.setInput('ariaLabel', config.ariaLabel);
      ref.setInput('size', config.size ?? 'md');

      (ref.instance as AtlasDialogContainerComponent).requestClose
        .subscribe(() => dialogRef.close());

      ref.changeDetectorRef.detectChanges();

      if (config.autoFocus ?? true) {
        queueMicrotask(() => {
          const panel = overlayRef.panelEl as HTMLElement | null;
          if (!panel) return;

          const preferred = panel.querySelector('[data-autofocus="true"]') as HTMLElement | null;
          const fallback = panel.querySelector(
            'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
          ) as HTMLElement | null;

          (preferred ?? fallback)?.focus({ preventScroll: true });
        });
      }
    }

    overlayRef.afterClosed$.subscribe(() => {
      if (!(dialogRef as any).closed$?.closed) dialogRef.close(undefined);
    });

    return dialogRef;
  }

  openComponent<TComponent, TResult = unknown, TData = unknown>(component: Type<TComponent>,
    config: AtlasDialogConfig<TData, TResult> = {}): AtlasDialogRef<TResult> {
    const id = config.id ?? this.makeId();

    const restoreFocus = (config.restoreFocus ?? true) ? captureFocusRestore() : null;
    const unlockScroll  = (config.lockScroll ?? true) ? lockBodyScroll() : null;
    const dialogRef = new AtlasDialogRef<TResult>();
    const dialogInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: AtlasDialogRef, useValue: dialogRef },
        { provide: ATLAS_DIALOG_DATA, useValue: config.data ?? null },
      ],
    });
    const overlayRef = this.overlay.open(AtlasDialogContainerComponent, {
      id,
      injector: dialogInjector,
      hasBackdrop: true,
      backdropClose: config.closeOnBackdrop ?? true,
      escClose: config.closeOnEsc ?? true,
      position: { type: 'center' },
      width: config.width,
      height: config.height,
      maxWidth: config.maxWidth ?? 'calc(100vw - 24px)',
      maxHeight: config.maxHeight ?? 'calc(100vh - 24px)',
      panelClass: ['atlas-dialog-overlay', ...(toArray(config.panelClass))],
      backdropClass: ['atlas-dialog-backdrop', ...(toArray(config.backdropClass))],
    });
    overlayRef.panelEl?.setAttribute?.('data-state', 'open');
    dialogRef.bind(overlayRef, id, overlayRef.contentRef ?? null, restoreFocus, unlockScroll);

    const ref = overlayRef.contentRef;
    if (ref) {
      ref.setInput('title', config.title);
      ref.setInput('ariaLabel', config.ariaLabel);
      ref.setInput('size', config.size ?? 'xl');
      ref.setInput('closeButton', config.closeButton ?? true);
      ref.setInput('component', component);
      ref.setInput('componentInjector', dialogInjector);
      ref.setInput('headerAlign', config.headerAlign ?? 'space-between');
      ref.setInput('footerTpl', config.footerTpl);
      ref.setInput('footerActions', config.footerActions);
      ref.setInput('footerAlign', config.footerAlign ?? 'end');

      (ref.instance as AtlasDialogContainerComponent).requestClose
        .subscribe(() => dialogRef.close());

      ref.changeDetectorRef.detectChanges();

      if (config.autoFocus ?? true) {
        queueMicrotask(() => {
          const panel = overlayRef.panelEl as HTMLElement | null;
          if (!panel) return;

          const preferred = panel.querySelector('[data-autofocus="true"]') as HTMLElement | null;
          const fallback = panel.querySelector(
            'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
          ) as HTMLElement | null;

          (preferred ?? fallback)?.focus({ preventScroll: true });
        });
      }
    }

    overlayRef.afterClosed$.subscribe(() => {
      if (!(dialogRef as any).closed$?.closed) dialogRef.close(undefined);
    });

    return dialogRef;
  }

  private makeId(): string {
    return globalThis.crypto?.randomUUID?.() ?? (Math.random().toString(16).slice(2) + Date.now().toString(16));
  }
}

function toArray(v?: string | string[]): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}
