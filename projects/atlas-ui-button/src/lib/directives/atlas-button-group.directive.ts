import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[atlas-button-group]',
  standalone: true,
})
export class AtlasButtonGroupDirective {
  @HostBinding('attr.atlas-button-group') readonly attr = '';
}
