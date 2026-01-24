import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AtlasOverlayRef } from '../../overlay/service/atlas-overlay-ref';

export class AtlasDialogRef<TResult = unknown> {
  private readonly closed$ = new Subject<TResult | undefined>();
  public readonly afterClosed$: Observable<TResult | undefined> = this.closed$.asObservable();

  private overlayRef: AtlasOverlayRef | null = null;
  public id = '';
  public contentRef: ComponentRef<unknown> | null = null;

  private restoreFocusFn: (() => void) | null = null;
  private unlockScrollFn: (() => void) | null = null;

  constructor(overlayRef?: AtlasOverlayRef, id?: string, contentRef?: ComponentRef<unknown> | null,
              restoreFocusFn?: (() => void) | null, unlockScrollFn?: (() => void) | null) {
    if (overlayRef) {
      this.bind(overlayRef, id ?? '', contentRef ?? null, restoreFocusFn
        ?? null, unlockScrollFn ?? null);
    }
  }

  public bind(overlayRef: AtlasOverlayRef, id: string, contentRef: ComponentRef<unknown> | null,
              restoreFocusFn: (() => void) | null, unlockScrollFn: (() => void) | null): void {
    this.overlayRef = overlayRef;
    this.id = id;
    this.contentRef = contentRef;
    this.restoreFocusFn = restoreFocusFn;
    this.unlockScrollFn = unlockScrollFn;
  }

  public close(result?: TResult): void {
    if (this.closed$.closed) return;

    try {
      this.overlayRef?.close();
    } finally {
      try { this.unlockScrollFn?.(); } catch {}
      try { this.restoreFocusFn?.(); } catch {}
      this.closed$.next(result);
      this.closed$.complete();
    }
  }
}
