import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[atlasPopoverTrigger]',
  standalone: true,
})
export class AtlasPopoverTriggerDirective {
  constructor(public readonly elRef: ElementRef<HTMLElement>) {}
}
