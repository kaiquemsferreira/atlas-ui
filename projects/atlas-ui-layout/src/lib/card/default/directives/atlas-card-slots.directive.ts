import { Directive } from '@angular/core';

@Directive({
  selector: '[atlasCardHeader]',
  standalone: true,
})
export class AtlasCardHeaderSlotDirective {}

@Directive({
  selector: '[atlasCardContent]',
  standalone: true,
})
export class AtlasCardContentSlotDirective {}

@Directive({
  selector: '[atlasCardBody]',
  standalone: true,
})
export class AtlasCardBodySlotDirective {}

@Directive({
  selector: '[atlasCardFooter]',
  standalone: true,
})
export class AtlasCardFooterSlotDirective {}
