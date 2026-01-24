import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[atlasTooltipTrigger]',
  standalone: true,
})
export class AtlasTooltipTriggerDirective {
  constructor(public readonly elRef: ElementRef<HTMLElement>) {}
}
