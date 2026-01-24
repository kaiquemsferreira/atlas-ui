import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { AtlasOptionItem, AtlasOptionRow } from '../single-select/option-list/model/atlas-option-item';
import { AtlasOptionListComponent } from '../single-select/option-list/atlas-option-list.component';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-select-panel',
  standalone: true,
  imports: [AtlasTranslationPipe, AtlasOptionListComponent],
  template: `
    <div class="atlas-select-panel" role="presentation" [attr.data-placement]="placement">
      @if (hasOptions) {
        <atlas-option-list
          [items]="items"
          [selected]="selected"
          [multiple]="multiple"
          [selectedValues]="selectedValues"
          [activeIndex]="activeIndex"
          [compareWith]="compareWith"
          (optionClick)="optionClick.emit($event)"
        />
      } @else {
        <div class="atlas-select__empty">{{ emptyKey | translate }}</div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasSelectPanelComponent<T = unknown> {
  @Input() items: AtlasOptionItem<T>[] = [];
  @Input() selected?: T;
  @Input() selectedValues: T[] = [];
  @Input() multiple = false;
  @Input() activeIndex = -1;

  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() emptyKey = 'ui.common.noResults';

  @Input() compareWith: (a: T | undefined, b: T | undefined) => boolean = (a, b) => a === b;

  @Input() hasOptions = true;

  @Output() optionClick = new EventEmitter<AtlasOptionRow<T>>();
}
