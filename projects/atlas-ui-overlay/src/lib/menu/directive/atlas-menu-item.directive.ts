import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[atlasMenuItem]',
  standalone: true,
})
export class AtlasMenuItemDirective {
  @Input() disabled = false;

  @HostBinding('attr.role') readonly role = 'menuitem';
  @HostBinding('attr.data-atlas-menu-item') readonly marker = 'true';
  @HostBinding('class.is-disabled') get isDisabled() { return this.disabled; }
  @HostBinding('attr.tabindex') get tabindex() { return this.disabled ? -1 : -1; }
  @HostBinding('attr.aria-disabled') get ariaDisabled() { return this.disabled ? 'true' : null; }
}
