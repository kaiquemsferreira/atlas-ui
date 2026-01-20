import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[atlasTab]',
  standalone: true,
})
export class AtlasTabCardSlotDirective {
  @Input('atlasTab') id!: string;
  constructor(public readonly templateRef: TemplateRef<unknown>) { }
}
