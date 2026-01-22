import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[atlasPrefixIcon]',
  standalone: true,
})
export class AtlasPrefixIconDirective {
  @HostBinding('attr.atlasPrefixIcon') readonly attr = '';
}
