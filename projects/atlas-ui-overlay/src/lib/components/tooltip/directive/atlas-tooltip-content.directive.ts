import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[atlasTooltipContent]',
  standalone: true,
})
export class AtlasTooltipContentDirective {
  constructor(public readonly template: TemplateRef<unknown>) {}
}
