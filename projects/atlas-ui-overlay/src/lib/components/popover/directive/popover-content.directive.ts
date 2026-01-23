import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[atlasPopoverContent]',
  standalone: true,
})
export class AtlasPopoverContentDirective {
  constructor(public readonly template: TemplateRef<unknown>) {}
}
