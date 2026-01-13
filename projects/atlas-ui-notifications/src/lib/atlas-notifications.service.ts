import { Injectable } from '@angular/core';

import { AtlasToast, AtlasToastText, AtlasToastVariant, TimerState } from './notification-types';
import { AtlasNotifyOptions } from './notification-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtlasNotificationsService {
  private readonly _toasts$ = new BehaviorSubject<AtlasToast[]>([]);
  public readonly toasts$ = this._toasts$.asObservable();
  private readonly timers = new Map<string, TimerState>();

  public info(message: string, options: AtlasNotifyOptions) { return this.notify('info', { text: message }, options); }
  public neutral(message: string, options: AtlasNotifyOptions = {}) { return this.notify('neutral', { text: message }, options); }
  public success(message: string, options: AtlasNotifyOptions = {}) { return this.notify('success', { text: message }, options); }
  public warning(message: string, options: AtlasNotifyOptions = {}) { return this.notify('warning', { text: message }, options); }
  public error(message: string, options: AtlasNotifyOptions = {}) { return this.notify('error', { text: message }, options); }
  public infoKey(key: string, options?: AtlasNotifyOptions, params?: Record<string, unknown>) { return this.notify('info', { key, params }, options); }
  public neutralKey(key: string, options?: AtlasNotifyOptions, params?: Record<string, unknown>) { return this.notify('neutral', { key, params }, options); }
  public successKey(key: string, options?: AtlasNotifyOptions, params?: Record<string, unknown>) { return this.notify('success', { key, params }, options); }
  public warningKey(key: string, options?: AtlasNotifyOptions, params?: Record<string, unknown>) { return this.notify('warning', { key, params }, options); }
  public errorKey(key: string, options?: AtlasNotifyOptions, params?: Record<string, unknown>) { return this.notify('error', { key, params }, options); }

  private notify(variant: AtlasToastVariant, message: AtlasToastText, options: AtlasNotifyOptions = {}) {
    const id = this.makeId();
    const durationMs = options.durationMs ?? 4500;

    const toast: AtlasToast = {
      id,
      variant,
      message,
      title: this.resolveText(options.title, options.titleKey, options.titleParams),
      details: this.resolveText(options.details, options.detailsKey, options.detailsParams),
      position: options.position ?? 'bottom-right',
      actions: options.actions,
      durationMs,
      dismissible: options.dismissible ?? true,
      expanded: options.expanded ?? false,
      size: options.size ?? 'md',
      createdAt: Date.now(),
    };

    this._toasts$.next([...this._toasts$.value, toast]);

    if (durationMs > 0) {
      this.timers.set(id, { startedAt: Date.now(), remainingMs: durationMs, paused: false });
      this.armTimer(id);
    }

    return id;
  }

  public dismiss(id: string) {
    this.clearTimer(id);
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }

  public clear() {
    [...this.timers.keys()].forEach(id => this.clearTimer(id));
    this._toasts$.next([]);
  }

  public toggleExpand(id: string) {
    this._toasts$.next(this._toasts$.value.map(t => t.id === id ? { ...t, expanded: !t.expanded } : t));
  }

  public pause(id: string) {
    const st = this.timers.get(id);
    if (!st || st.paused) return;

    const elapsed = Date.now() - st.startedAt;
    st.remainingMs = Math.max(0, st.remainingMs - elapsed);
    st.paused = true;

    if (st.timeoutId) globalThis.clearTimeout(st.timeoutId);
    st.timeoutId = undefined;
  }

  public resume(id: string) {
    const st = this.timers.get(id);
    if (!st?.paused) return;

    st.paused = false;
    st.startedAt = Date.now();
    this.armTimer(id);
  }

  public getTimerState(id: string) {
    const st = this.timers.get(id);
    if (!st) return null;

    const elapsed = st.paused ? 0 : (Date.now() - st.startedAt);
    const remaining = Math.max(0, st.remainingMs - elapsed);
    return { remainingMs: remaining, paused: st.paused };
  }

  private resolveText(text?: string, key?: string, params?: Record<string, unknown>): AtlasToastText | undefined {
    if (key) return { key, params };
    if (text) return { text };
    return undefined;
  }

  private armTimer(id: string) {
    const st = this.timers.get(id);
    if (!st || st.paused) return;

    st.timeoutId = globalThis.setTimeout(() => this.dismiss(id), st.remainingMs);
  }

  private clearTimer(id: string) {
    const st = this.timers.get(id);
    if (st?.timeoutId) globalThis.clearTimeout(st.timeoutId);
    this.timers.delete(id);
  }

  private makeId() {
    return (globalThis.crypto?.randomUUID?.() ?? (Math.random().toString(16).slice(2) + Date.now().toString(16)));
  }
}
