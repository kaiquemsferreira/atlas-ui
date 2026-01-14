import { Directive } from '@angular/core';

@Directive({
  selector: '[atlasCardHeader]',
  standalone: true,
})
export class AtlasCardHeaderDirective {}

@Directive({
  selector: '[atlasCardFooter]',
  standalone: true,
})
export class AtlasCardFooterDirective {}
