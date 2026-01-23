import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[atlasHintContent]',
  standalone: true,
})
export class AtlasHintContentDirective {
  constructor(public readonly template: TemplateRef<unknown>) {}
}
