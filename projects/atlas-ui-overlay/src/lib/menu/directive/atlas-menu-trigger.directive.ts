import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[atlasMenuTrigger]',
  standalone: true,
})
export class AtlasMenuTriggerDirective {
  constructor(public readonly elRef: ElementRef<HTMLElement>) {}
}
