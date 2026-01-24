import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[atlasMenuSeparator]',
  standalone: true,
})
export class AtlasMenuSeparatorDirective {
  @HostBinding('attr.role') readonly role = 'separator';
  @HostBinding('class.atlas-menu__separator') readonly cls = true;
}
