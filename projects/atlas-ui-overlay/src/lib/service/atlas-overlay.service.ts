import { ApplicationRef, ComponentRef, EmbeddedViewRef, EnvironmentInjector, Injectable, Injector, TemplateRef,
  Type, createComponent } from '@angular/core';


import { AtlasOverlayConfig, AtlasOverlayPosition } from '../model/atlas-overlay.types';
import { ATLAS_OVERLAY_CONTAINER_ID } from '../token/atlas-overlay.tokens';
import { applyPosition } from '../position/position-engine';
import { AtlasOverlayRef } from './atlas-overlay-ref';
import { fromEvent, merge, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AtlasOverlayService {
  private containerEl?: HTMLElement;

  constructor(private readonly envInjector: EnvironmentInjector,
              private readonly appRef: ApplicationRef,
              private readonly injector: Injector) {}

  open<TComponent, TResult = unknown>(
    component: Type<TComponent>,
    config: AtlasOverlayConfig = {}
  ): AtlasOverlayRef<TResult> {
    return this._open<TResult>({ kind: 'component', component: component as Type<any> }, config);
  }

  openTemplate<TData = unknown, TResult = unknown>(
    template: TemplateRef<unknown>,
    config?: {
      viewContainerRef: any;
      hasBackdrop: boolean;
      escClose: boolean;
      backdropClose: boolean;
      position: AtlasOverlayPosition;
      panelClass: string[]
    }
  ): AtlasOverlayRef<TResult> {
    return this._open<TResult>({ kind: 'template', template }, config);
  }

  private _open<TResult>(content: | { kind: 'component'; component: any } | { kind: 'template'; template: TemplateRef<unknown> },
                         config: AtlasOverlayConfig = {}): AtlasOverlayRef<TResult> {
    const id = config.id ?? this.makeId();
    this.ensureContainer();

    const position: AtlasOverlayPosition =
      config.position ?? ({ type: 'center' } as const);

    const backdropEl = config.hasBackdrop ? document.createElement('div') : null;
    if (backdropEl) {
      backdropEl.className = this.classNames('atlas-overlay-backdrop', config.backdropClass);
      this.containerEl!.appendChild(backdropEl);
    }

    const panelEl = document.createElement('div');
    panelEl.className = this.classNames('atlas-overlay-panel', config.panelClass);
    panelEl.setAttribute('data-overlay-id', id);
    panelEl.tabIndex = -1;

    if (config.width) panelEl.style.width = config.width;
    if (config.height) panelEl.style.height = config.height;
    if (config.maxWidth) panelEl.style.maxWidth = config.maxWidth;
    if (config.maxHeight) panelEl.style.maxHeight = config.maxHeight;

    this.containerEl!.appendChild(panelEl);

    let contentRef: ComponentRef<unknown> | null = null;
    let embeddedView: EmbeddedViewRef<unknown> | null = null;

    if (content.kind === 'component') {
      contentRef = createComponent(content.component, {
        environmentInjector: this.envInjector,
        elementInjector: this.injector,
      });

      this.appRef.attachView(contentRef.hostView);

      const view = contentRef.hostView as EmbeddedViewRef<any>;
      for (const node of view.rootNodes) {
        if (node instanceof Node) panelEl.appendChild(node);
      }

      if (config.data != null) {
        (contentRef.instance as any).data = config.data;
      }
    } else {
      const vcr = config.viewContainerRef;
      if (!vcr) {
        throw new Error('AtlasOverlayService.openTemplate requires viewContainerRef in config.');
      }
      embeddedView = vcr.createEmbeddedView(content.template, { $implicit: config.data });
      embeddedView.detectChanges();
      embeddedView.rootNodes.forEach((n: any) => panelEl.appendChild(n));
    }

    panelEl.style.visibility = 'hidden';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyPosition(panelEl, position);
        panelEl.style.visibility = '';
      });
    });

    const subs = new Subscription();

    const overlayRef = new AtlasOverlayRef<TResult>(
      () => {
        subs.unsubscribe();

        if (contentRef) {
          this.appRef.detachView(contentRef.hostView);
          contentRef.destroy();
        }
        embeddedView?.destroy();

        panelEl.remove();
        backdropEl?.remove();
      },
      id,
      panelEl,
      backdropEl,
      contentRef
    );

    if (backdropEl && (config.backdropClose ?? true)) {
      subs.add(fromEvent(backdropEl, 'click').subscribe(() => overlayRef.close()));
    }
    if (config.escClose ?? true) {
      subs.add(
        fromEvent<KeyboardEvent>(document, 'keydown').subscribe((e) => {
          if (e.key === 'Escape') overlayRef.close();
        })
      );
    }

    subs.add(merge(fromEvent(globalThis, 'resize'),
        fromEvent(globalThis, 'scroll', { capture: true } as AddEventListenerOptions))
        .pipe(auditTime(16))
        .subscribe(() => applyPosition(panelEl, position))
    );

    return overlayRef;
  }

  private ensureContainer(): void {
    if (this.containerEl) return;

    const id = this.injector.get(ATLAS_OVERLAY_CONTAINER_ID);
    let el = document.getElementById(id) as HTMLElement | null;

    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.className = 'atlas-overlay-container';
      document.body.appendChild(el);
    }

    this.containerEl = el;
  }

  private classNames(base: string, extra?: string | string[]): string {
    const extras = Array.isArray(extra) ? extra : extra ? [extra] : [];
    return [base, ...extras].filter(Boolean).join(' ');
  }

  private makeId(): string {
    return globalThis.crypto?.randomUUID?.() ?? (Math.random().toString(16).slice(2) + Date.now().toString(16));
  }
}
