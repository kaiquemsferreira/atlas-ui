import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input,
  Output, computed, inject, signal, effect
} from '@angular/core';

import { AtlasOptionItem, AtlasOptionRow, OptionItem } from './option-list/model/atlas-option-item';
import { AtlasOptionListComponent } from './option-list/atlas-option-list.component';
import { AtlasInputDirective } from '../../input/directives/input.directive';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';
import { AtlasSelectRegistry } from './service/atlas-select-registry.service';

@Component({
  selector: 'atlas-select',
  standalone: true,
  imports: [AtlasTranslationPipe, AtlasInputDirective, AtlasOptionListComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasSelectComponent<T = unknown> {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly selectRegistry = inject(AtlasSelectRegistry);

  private readonly _disabled = signal(false);
  private readonly _filterable = signal(false);
  protected readonly activeIndex = signal<number>(-1);
  private readonly _value = signal<T | undefined>(undefined);
  private readonly _items = signal<AtlasOptionItem<T>[]>([]);

  @Input()
  set items(v: ReadonlyArray<AtlasOptionItem<T>> | null | undefined) {
    this._items.set([...(v ?? [])]);
  }
  get items() { return this._items() }

  @Input()
  set value(v: T | undefined) { this._value.set(v) }
  get value() {return this._value() }

  @Input()
  set disabled(v: boolean) { this._disabled.set(v) }
  get disabled() { return this._disabled() }

  @Input()
  set filterable(v: boolean) { this._filterable.set(v) }
  get filterable() { return this._filterable() }

  @Input() placeholder = 'Select option';
  @Output() readonly valueChange = new EventEmitter<T | undefined>();

  @Input() public clearable = true;
  @Input() compareWith: (a: T | undefined, b: T | undefined) => boolean = (a, b) => a === b;

  private readonly id = crypto.randomUUID();

  protected readonly open = signal(false);
  protected readonly query = signal('');

  private readonly optionRows = computed<AtlasOptionRow<T>[]>(() =>
    this._items().filter((i): i is AtlasOptionRow<T> => i.kind === 'option')
  );

  protected readonly selected = computed(() => {
    const v = this._value();
    return this.optionRows().find(o => this.compareWith(o.value, v));
  });

  protected readonly filteredItems = computed<AtlasOptionItem<T>[]>(() => {
    const items = this._items();
    const q = this.query().trim().toLowerCase();

    if (!this._filterable() || !q) return items;

    const isGroupOrDivider = (it: AtlasOptionItem<T>) =>
      it.kind === 'group' || it.kind === 'divider';

    const isOption = (it: AtlasOptionItem<T>): it is OptionItem<T> =>
      it.kind === 'option';

    const matchesQuery = (it: AtlasOptionItem<T>) =>
      isOption(it) && (it.label ?? '').toLowerCase().includes(q);

    const dropEdgeGroupDividers = (arr: AtlasOptionItem<T>[]) => {
      while (arr.length && isGroupOrDivider(arr[0])) arr.shift();
      while (arr.length && isGroupOrDivider(arr.at(-1)!)) arr.pop();
    };

    const out: AtlasOptionItem<T>[] = [];
    let lastWasGroupOrDivider = false;

    for (const it of items) {
      if (isGroupOrDivider(it)) {
        out.push(it);
        lastWasGroupOrDivider = true;
        continue;
      }

      if (matchesQuery(it)) {
        out.push(it);
        lastWasGroupOrDivider = false;
        continue;
      }

      if (lastWasGroupOrDivider && isGroupOrDivider(out.at(-1)!)) {
        out.pop();
      }
    }

    dropEdgeGroupDividers(out);
    return out;
  });

  private readonly filteredOptionRows = computed<AtlasOptionRow<T>[]>(() =>
    this.filteredItems().filter((i): i is AtlasOptionRow<T> => i.kind === 'option')
  );


  protected readonly hasOptions = computed(() =>
    this.filteredItems().some(i => i.kind === 'option')
  );

  constructor() {
    this.runEffect();
  }

  private runEffect() {
    effect(() => {
      const openId = this.selectRegistry.openId();
      if (openId !== this.id && this.open()) {
        this.close();
      }
    });
  }

  protected toggle(ev?: Event): void {
    ev?.stopPropagation();
    if (this._disabled()) return;
    const next = !this.open();

    if (next) {
      this.selectRegistry.setOpen(this.id);
      this.open.set(true);
      this.initActiveIndex();
    } else {
      this.close();
    }
  }

  private initActiveIndex(): void {
    const opts = this.filteredOptionRows();
    if (!opts.length) {
      this.activeIndex.set(-1);
      return;
    }

    const selected = this.selected();
    if (selected) {
      const idx = opts.findIndex(o => this.compareWith(o.value, selected.value));
      this.activeIndex.set(idx >= 0 ? idx : this.firstEnabledOptionIndex());
    } else {
      this.activeIndex.set(this.firstEnabledOptionIndex());
    }
  }

  private firstEnabledOptionIndex(): number {
    return this.filteredOptionRows().findIndex(o => !o.disabled);
  }

  protected close(): void {
    this.open.set(false);

    if (this.selectRegistry.openId() === this.id) {
      this.selectRegistry.setOpen(null);
    }

    if (this._filterable()) {
      this.query.set(this.selected()?.label ?? '');
    } else {
      this.query.set('');
    }
  }

  protected onFilter(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value ?? '';
    this.query.set(v);
    if (!this.open()) this.open.set(true);
  }

  protected onOptionClick(opt: AtlasOptionRow<T>): void {
    this.selectOption(opt);
  }

  protected selectOption(opt: AtlasOptionRow<T>): void {
    if (this._disabled() || opt.disabled) return;

    const current = this._value();
    const same = this.compareWith(opt.value, current);

    if (same && this.clearable) {
      this._value.set(undefined);
      this.valueChange.emit(undefined);
      if (this._filterable()) this.query.set('');
      this.close();
      return;
    }

    this._value.set(opt.value);
    this.valueChange.emit(opt.value);

    if (this._filterable()) {
      this.query.set(opt.label ?? '');
    }

    this.close();
  }

  protected displayLabel(): string {
    return this.selected()?.label ?? '';
  }

  protected canClear(): boolean {
    return this.clearable && !this._disabled() && this._value() !== undefined;
  }

  protected clearValue(ev?: Event): void {
    ev?.stopPropagation();
    if (!this.canClear()) return;

    this._value.set(undefined);
    this.valueChange.emit(undefined);

    if (this.filterable) this.query.set('');
    this.close();
  }

  private moveActive(delta: number): void {
    const opts = this.filteredOptionRows();
    if (!opts.length) return;

    const len = opts.length;
    const start = this.activeIndex();

    let idx = start;
    do {
      idx = (idx + delta + len) % len;
      if (!opts[idx].disabled) {
        this.activeIndex.set(idx);
        return;
      }
    } while (idx !== start);
  }

  private selectActive(): void {
    const idx = this.activeIndex();
    const opt = this.filteredOptionRows()[idx];
    if (opt) this.selectOption(opt);
  }

  @HostListener('keydown', ['$event'])
  protected onHostKeyDown(ev: KeyboardEvent): void {
    if (this.disabled) return;

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.toggle(ev);
    }
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(ev: KeyboardEvent): void {
    if (this.disabled) return;

    switch (ev.key) {
      case 'ArrowDown':
        ev.preventDefault();
        if (this.open()) {
          this.moveActive(1);
        } else {
          this.toggle();
        }
        break;

      case 'ArrowUp':
        ev.preventDefault();
        if (this.open()) {
          this.moveActive(-1);
        } else {
          this.toggle();
        }
        break;

      case 'Enter':
        if (!this.open()) return;
        ev.preventDefault();
        this.selectActive();
        break;

      case 'Escape':
        if (!this.open()) return;
        ev.preventDefault();
        this.close();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocClick(ev: MouseEvent): void {
    if (!this.open()) return;
    if (!this.host.nativeElement.contains(ev.target as Node)) this.close();
  }
}
