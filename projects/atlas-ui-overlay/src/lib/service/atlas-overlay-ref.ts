import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class AtlasOverlayRef<TResult = unknown> {
  private readonly _afterClosed$ = new Subject<TResult | undefined>();

  constructor(private readonly disposeFn: (result?: TResult) => void,
              public readonly id: string,
              public readonly panelEl: HTMLElement,
              public readonly backdropEl: HTMLElement | null,
              public readonly contentRef: ComponentRef<unknown> | null) {}

  get afterClosed$(): Observable<TResult | undefined> {
    return this._afterClosed$.asObservable();
  }

  public close(result?: TResult): void {
    this.disposeFn(result);
    this._afterClosed$.next(result);
    this._afterClosed$.complete();
  }
}
