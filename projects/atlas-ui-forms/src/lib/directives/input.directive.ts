import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

@Directive({
  selector: 'input[atlas-input],textarea[atlas-input]',
  standalone: true,
})
export class AtlasInputDirective {
  private readonly el = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
  @HostBinding('attr.atlas-input') readonly attr = '';

  @HostBinding('attr.placeholder')
  get placeholderAttr() {
    return this.el.nativeElement.getAttribute('placeholder');
  }
}
