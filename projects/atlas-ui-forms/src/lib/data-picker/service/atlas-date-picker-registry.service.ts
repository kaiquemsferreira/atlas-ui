import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AtlasDatePickerRegistry {
  private readonly _openId = signal<string | null>(null);
  readonly openId = this._openId.asReadonly();

  public setOpen(id: string | null): void {
    this._openId.set(id);
  }
}
