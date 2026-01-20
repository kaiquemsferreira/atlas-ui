import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { AtlasOptionItem, AtlasOptionRow } from './model/atlas-option-item';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';
import { Vm } from './model/vm.type';
import { AtlasCheckboxComponent } from '../../../checkbox/checkbox.component';

@Component({
  selector: 'atlas-option-list',
  standalone: true,
  imports: [AtlasTranslationPipe, NgOptimizedImage, AtlasCheckboxComponent],
  templateUrl: './atlas-option-list.component.html',
  styleUrls: ['./atlas-option-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasOptionListComponent<T = unknown> {
  @Input() public selected?: T;
  @Input() public activeIndex = -1;

  @Input() public multiple = false;

  private readonly _selectedValues = signal<T[]>([]);
  @Input()
  set selectedValues(v: ReadonlyArray<T> | null | undefined) {
    this._selectedValues.set([...(v ?? [])]);
  }
  get selectedValues(): T[] {
    return this._selectedValues();
  }

  @Input()
  public compareWith: (a: T | undefined, b: T | undefined) => boolean = (a, b) => a === b;

  private readonly _items = signal<AtlasOptionItem<T>[]>([]);
  @Input()
  set items(v: ReadonlyArray<AtlasOptionItem<T>> | null | undefined) {
    this._items.set([...(v ?? [])]);
  }

  @Output() readonly optionClick = new EventEmitter<AtlasOptionRow<T>>();

  protected readonly vm = computed<Vm<T>[]>(() => {
    const items = this._items();
    const out: Vm<T>[] = [];
    let optIndex = 0;

    for (const it of items) {
      if (it.kind === 'divider') { out.push({ kind: 'divider' }); continue; }
      if (it.kind === 'group') { out.push({ kind: 'group', group: it }); continue; }
      out.push({ kind: 'option', opt: it, optionIndex: optIndex });
      optIndex++;
    }

    return out;
  });

  public isSelected(opt: AtlasOptionRow<T>): boolean {
    if (this.multiple) {
      const values = this._selectedValues();
      return values.some(v => this.compareWith(v, opt.value));
    }
    return this.compareWith(this.selected, opt.value);
  }

  public onClick(opt: AtlasOptionRow<T>, ev: MouseEvent): void {
    ev.stopPropagation();
    if (opt.disabled) return;
    this.optionClick.emit(opt);
  }

  public onCheckboxToggle(opt: AtlasOptionRow<T>): void {
    if (opt.disabled) return;
    this.optionClick.emit(opt);
  }
}
