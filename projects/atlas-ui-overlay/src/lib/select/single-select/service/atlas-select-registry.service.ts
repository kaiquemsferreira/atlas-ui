import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AtlasSelectRegistry {
  private readonly _openId = signal<string | null>(null);
  public readonly openId = this._openId.asReadonly();

  public setOpen(id: string | null) {
    this._openId.set(id);
  }
}
