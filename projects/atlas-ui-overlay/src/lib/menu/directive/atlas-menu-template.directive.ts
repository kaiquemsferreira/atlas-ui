import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[atlasMenu]',
  standalone: true,
})
export class AtlasMenuTemplateDirective {
  constructor(public readonly template: TemplateRef<unknown>) {}
}
