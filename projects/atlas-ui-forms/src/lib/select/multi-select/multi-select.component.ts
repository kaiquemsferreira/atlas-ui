import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, HostListener,
  Input, Output, computed, effect, inject, signal, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AtlasOptionItem, AtlasOptionRow, OptionItem } from '../single-select/option-list/model/atlas-option-item';
import { AtlasOptionListComponent } from '../single-select/option-list/atlas-option-list.component';
import { AtlasSelectRegistry } from '../single-select/service/atlas-select-registry.service';
import { AtlasInputDirective } from '../../input/directives/input.directive';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';
import { auditTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';


@Component({
  selector: 'atlas-multi-select',
  standalone: true,
  imports: [AtlasTranslationPipe, AtlasInputDirective, AtlasOptionListComponent],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasMultiSelectComponent<T = unknown> implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly id = crypto.randomUUID();
  private readonly registry = inject(AtlasSelectRegistry);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly query = signal('');
  private readonly _values = signal<T[]>([]);
  protected readonly open = signal(false);
  private readonly _disabled = signal(false);
  protected readonly activeIndex = signal(-1);
  protected readonly showChips = signal(true);
  private readonly _filterable = signal(false);
  private readonly _items = signal<AtlasOptionItem<T>[]>([]);

  @Output() readonly valuesChange = new EventEmitter<T[]>();

  @Input()
  set items(v: ReadonlyArray<AtlasOptionItem<T>> | null | undefined) {
    this._items.set([...(v ?? [])]);
    queueMicrotask(() => this.recalcChips());
  }
  get items() { return this._items(); }

  @Input()
  set values(v: T[] | null | undefined) {
    this._values.set(v ? [...v] : []);
    queueMicrotask(() => this.recalcChips());
  }
  get values(): T[] { return this._values(); }

  @Input()
  set disabled(v: boolean) { this._disabled.set(v); }
  get disabled() { return this._disabled(); }

  @Input()
  set filterable(v: boolean) { this._filterable.set(v); }
  get filterable() { return this._filterable(); }

  @Input() clearable = true;
  @Input() compareWith: (a: T | undefined, b: T | undefined) => boolean = (a, b) => a === b;

  constructor() {
    effect(() => {
      const openId = this.registry.openId();
      if (openId !== this.id && this.open()) this.close();
    });
  }

  ngAfterViewInit(): void {
    merge(
      fromEvent(globalThis, 'resize'),
      fromEvent(globalThis, 'orientationchange'),
    )
      .pipe(auditTime(16), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.recalcChips());

    queueMicrotask(() => this.recalcChips());
  }

  private readonly optionRows = computed<AtlasOptionRow<T>[]>(() =>
    this._items().filter((i): i is AtlasOptionRow<T> => i.kind === 'option')
  );

  protected readonly selectedRows = computed<AtlasOptionRow<T>[]>(() => {
    const vals = this._values();
    const rows = this.optionRows();
    return rows.filter(r => vals.some(v => this.compareWith(v, r.value)));
  });

  protected readonly filteredItems = computed<AtlasOptionItem<T>[]>(() => {
    const items = this._items();
    const q = this.query().trim().toLowerCase();

    if (!this._filterable() || !q) return items;

    const isMeta = (it: AtlasOptionItem<T>) => it.kind === 'group' || it.kind === 'divider';
    const isOpt = (it: AtlasOptionItem<T>): it is OptionItem<T> => it.kind === 'option';

    const out: AtlasOptionItem<T>[] = [];

    for (const it of items) {
      if (isMeta(it)) { out.push(it); continue; }
      if (!isOpt(it)) continue;

      const matches = (it.label ?? '').toLowerCase().includes(q);
      if (!matches) {
        const prev = out.at(-1);
        if (prev && isMeta(prev)) out.pop();
        continue;
      }
      out.push(it);
    }

    this.trimMetaEdges(out);
    return out;
  });

  protected readonly hasOptions = computed(() =>
    this.filteredItems().some(i => i.kind === 'option')
  );

  private readonly filteredOptionRows = computed<AtlasOptionRow<T>[]>(() =>
    this.filteredItems().filter((i): i is AtlasOptionRow<T> => i.kind === 'option')
  );

  private trimMetaEdges(items: AtlasOptionItem<T>[]): void {
    const isMeta = (it: AtlasOptionItem<T>) => it.kind === 'group' || it.kind === 'divider';
    while (items.length && isMeta(items[0])) items.shift();
    while (items.length && isMeta(items.at(-1)!)) items.pop();
  }

  protected toggle(ev?: Event): void {
    ev?.stopPropagation();
    if (this._disabled()) return;

    const next = !this.open();

    if (next) {
      this.registry.setOpen(this.id);
      this.open.set(true);
      this.initActiveIndex();
      queueMicrotask(() => this.recalcChips());
    } else {
      this.close();
    }
  }

  protected close(): void {
    this.open.set(false);
    if (this.registry.openId() === this.id) this.registry.setOpen(null);
    if (this._filterable()) this.query.set('');
  }

  protected onFilter(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value ?? '';
    this.query.set(v);

    if (!this.open()) {
      this.registry.setOpen(this.id);
      this.open.set(true);
    }
    this.initActiveIndex();
  }

  protected onOptionClick(opt: AtlasOptionRow<T>): void {
    if (this._disabled() || opt.disabled) return;

    const vals = this._values();
    const exists = vals.some(v => this.compareWith(v, opt.value));

    const next = exists
      ? vals.filter(v => !this.compareWith(v, opt.value))
      : [...vals, opt.value];

    this._values.set(next);
    this.valuesChange.emit(next);

    if (this._filterable()) {
      this.query.set('');
      this.initActiveIndex();
    }

    queueMicrotask(() => this.recalcChips());
  }

  protected removeValue(value: T, ev?: Event): void {
    ev?.stopPropagation();
    if (this._disabled()) return;

    const next = this._values().filter(v => !this.compareWith(v, value));
    this._values.set(next);
    this.valuesChange.emit(next);
    queueMicrotask(() => this.recalcChips());
  }

  protected canClear(): boolean {
    return this.clearable && !this._disabled() && this._values().length > 0;
  }

  protected clearAll(ev?: Event): void {
    ev?.stopPropagation();
    if (!this.canClear()) return;

    this._values.set([]);
    this.valuesChange.emit([]);
    if (this._filterable()) this.query.set('');
    this.close();
    queueMicrotask(() => this.recalcChips());
  }

  private initActiveIndex(): void {
    const opts = this.filteredOptionRows();
    if (!opts.length) { this.activeIndex.set(-1); return; }
    const idx = opts.findIndex(o => !o.disabled);
    this.activeIndex.set(idx);
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

  private toggleActive(): void {
    const idx = this.activeIndex();
    const opt = this.filteredOptionRows()[idx];
    if (opt) this.onOptionClick(opt);
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(ev: KeyboardEvent): void {
    if (this.disabled) return;

    switch (ev.key) {
      case 'ArrowDown':
        ev.preventDefault();
        if (this.open()) this.moveActive(1);
        else this.toggle();
        break;

      case 'ArrowUp':
        ev.preventDefault();
        if (this.open()) this.moveActive(-1);
        else this.toggle();
        break;

      case 'Enter':
        if (!this.open()) return;
        ev.preventDefault();
        this.toggleActive();
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

  private recalcChips(): void {
    if (this.selectedRows().length === 0) {
      this.showChips.set(true);
      return;
    }

    const el = this.host.nativeElement;
    const value = el.querySelector('.atlas-multi-select__value') as HTMLElement | null;
    const chips = el.querySelector('.atlas-multi-select__chips') as HTMLElement | null;
    if (!value || !chips) {
      this.showChips.set(false);
      return;
    }

    const available = value.clientWidth;
    const needed = chips.scrollWidth;
    const safety = 110;
    this.showChips.set(needed + safety <= available);
  }
}
