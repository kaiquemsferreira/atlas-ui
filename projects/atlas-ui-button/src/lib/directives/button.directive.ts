import { Directive, ElementRef, HostBinding, HostListener, Input, computed, inject, signal,
  booleanAttribute } from '@angular/core';

import { AtlasButtonVariant } from '../model/atlas-button-variant';
import { AtlasButtonColor } from '../model/atlas-button-color';
import { AtlasButtonSize } from '../model/atlas-button-size';

@Directive({
  selector: 'button[atlas-button],a[atlas-button]',
  standalone: true,
})
export class AtlasButtonDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly _variant = signal<AtlasButtonVariant>('solid');
  private readonly _color = signal<AtlasButtonColor>('primary');
  private readonly _size = signal<AtlasButtonSize>('md');

  private readonly _loading = signal(false);
  private readonly _disabled = signal(false);
  private readonly _iconOnly = signal(false);
  private readonly _fullWidth = signal(false);

  @Input() set variant(v: AtlasButtonVariant) { if (v) this._variant.set(v) }
  @Input() set color(v: AtlasButtonColor) { if (v) this._color.set(v) }
  @Input() set size(v: AtlasButtonSize) { if (v) this._size.set(v) }
  @Input({ transform: booleanAttribute }) set loading(v: boolean) { this._loading.set(v) }
  @Input({ transform: booleanAttribute }) set disabled(v: boolean) {this._disabled.set(v) }
  @Input({ transform: booleanAttribute }) set iconOnly(v: boolean) { this._iconOnly.set(v) }
  @Input({ transform: booleanAttribute }) set fullWidth(v: boolean) {
    this._fullWidth.set(v);
  }

  private readonly isAnchor = computed(() => this.el.nativeElement.tagName.toLowerCase() === 'a');

  @HostBinding('attr.atlas-button') readonly attr = '';
  @HostBinding('attr.data-variant') get dataVariant() { return this._variant() }
  @HostBinding('attr.data-color') get dataColor() { return this._color() }
  @HostBinding('attr.data-size') get dataSize() {return this._size()}

  @HostBinding('attr.data-icon-only') get dataIconOnly() { return this._iconOnly() ? 'true' : null }
  @HostBinding('attr.data-full-width') get dataFullWidth() { return this._fullWidth() ? 'true' : null }
  @HostBinding('attr.aria-busy') get ariaBusy() { return this._loading() ? 'true' : null }

  @HostBinding('attr.disabled')
  get nativeDisabled() {
    const isButton = !this.isAnchor();
    return isButton && (this._disabled() || this._loading()) ? '' : null;
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled() {
    return this.isAnchor() && (this._disabled() || this._loading()) ? 'true' : null;
  }

  @HostBinding('attr.tabindex')
  get tabIndex() {
    return this.isAnchor() && (this._disabled() || this._loading()) ? -1 : null;
  }

  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    if (!this.isAnchor()) return;
    if (this._disabled() || this._loading()) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }
}
