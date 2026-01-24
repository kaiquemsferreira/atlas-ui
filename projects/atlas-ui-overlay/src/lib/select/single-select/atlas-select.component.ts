import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input,
  Output, computed, inject, signal, effect, ViewChild, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AtlasOptionItem, AtlasOptionRow, OptionItem } from './option-list/model/atlas-option-item';
import { AtlasOverlayService } from '../../overlay/service/atlas-overlay.service';
import { AtlasSelectPanelComponent } from '../panel/atlas-select-panel.component';
import { AtlasOverlayPosition } from '../../overlay/model/atlas-overlay.types';
import { AtlasSelectRegistry } from './service/atlas-select-registry.service';
import { AtlasOverlayRef } from '../../overlay/service/atlas-overlay-ref';
import { AtlasInputDirective } from 'atlas-ui-forms';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-select',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasInputDirective
  ],
  templateUrl: './atlas-select.component.html',
  styleUrls: ['./atlas-select.component.scss', '../../overlay/component/atlas-overlay.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasSelectComponent<T = unknown> {
  @ViewChild('control', { static: true }) private controlEl!: ElementRef<HTMLElement>;
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly selectRegistry = inject(AtlasSelectRegistry);
  private readonly overlay = inject(AtlasOverlayService);
  private readonly destroyRef = inject(DestroyRef);
  private overlayRef: AtlasOverlayRef | null = null;

  private readonly _disabled = signal(false);
  private readonly _filterable = signal(false);
  protected readonly activeIndex = signal<number>(-1);
  private readonly _value = signal<T | undefined>(undefined);
  private readonly _items = signal<AtlasOptionItem<T>[]>([]);
  protected readonly open = signal(false);
  protected readonly query = signal('');

  private readonly id = crypto.randomUUID();

  @Input() set items(v: ReadonlyArray<AtlasOptionItem<T>> | null | undefined) {
    this._items.set([...(v ?? [])]);
  }
  get items() { return this._items() }

  @Input() set value(v: T | undefined) { this._value.set(v) }
  get value() { return this._value() }

  @Input() set disabled(v: boolean) { this._disabled.set(v) }
  get disabled() { return this._disabled() }

  @Input() set filterable(v: boolean) { this._filterable.set(v) }
  get filterable() { return this._filterable() }

  @Input() public clearable = true;
  @Input() compareWith: (a: T | undefined, b: T | undefined) => boolean = (a, b) => a === b;

  @Output() readonly valueChange = new EventEmitter<T | undefined>();

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

  private readonly filteredOptionRows = computed<AtlasOptionRow<T>[]>(() =>
    this.filteredItems().filter((i): i is AtlasOptionRow<T> => i.kind === 'option')
  );

  protected readonly hasOptions = computed(() =>
    this.filteredItems().some(i => i.kind === 'option')
  );

  constructor() {
    this.runEffect();
  }

  private runEffect(): void {
    effect(() => {
      const openId = this.selectRegistry.openId();
      if (openId !== this.id && this.open()) this.close();
    });
  }

  protected toggle(ev?: Event): void {
    ev?.stopPropagation();
    if (this._disabled()) return;
    this.open() ? this.close() : this.openOverlay();
  }

  private openOverlay(): void {
    if (this._disabled() || this.overlayRef) return;

    this.selectRegistry.setOpen(this.id);
    this.open.set(true);
    this.initActiveIndex();

    const position: AtlasOverlayPosition = {
      type: 'connected',
      origin: this.controlEl.nativeElement,
      placement: 'bottom',
      align: 'start',
      offsetPx: 8,
      flip: true,
      matchWidth: true
    };

    this.overlayRef = this.overlay.open(AtlasSelectPanelComponent<T>, {
      hasBackdrop: false,
      backdropClose: false,
      escClose: false,
      position,
      panelClass: ['atlas-select-overlay', 'atlas-select-overlay-panel'],
    });

    this.overlayRef.panelEl?.setAttribute?.('data-state', 'open');
    this.overlayRef.panelEl?.setAttribute?.('data-placement', position.placement);
    const w = this.controlEl.nativeElement.getBoundingClientRect().width;
    this.overlayRef.panelEl.style.width = `${w}px`;
    this.overlayRef.panelEl.style.minWidth = `${Math.max(w, 288)}px`;
    this.overlayRef.panelEl.style.setProperty('--atlas-overlay-origin-w', `${w}px`)

    const ref = this.overlayRef.contentRef;
    if (ref) {
      ref.setInput('items', this.filteredItems());
      ref.setInput('selected', this._value());
      ref.setInput('multiple', false);
      ref.setInput('activeIndex', this.activeIndex());
      ref.setInput('compareWith', this.compareWith);
      ref.setInput('hasOptions', this.hasOptions());
      ref.setInput('placement', (position as any).placement ?? 'bottom');

      (ref.instance as AtlasSelectPanelComponent<T>).optionClick
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((opt) => this.onOptionClick(opt));

      ref.changeDetectorRef.detectChanges();
    }
  }

  protected close(): void {
    this.open.set(false);

    if (this.selectRegistry.openId() === this.id) this.selectRegistry.setOpen(null);

    this.overlayRef?.close();
    this.overlayRef = null;

    if (this._filterable()) {
      this.query.set(this.selected()?.label ?? '');
    } else {
      this.query.set('');
    }
  }

  protected onFilter(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value ?? '';
    this.query.set(v);
    if (!this.open()) this.openOverlay();
    this.initActiveIndex();
    this.syncPanelInputs();
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

    if (this._filterable()) this.query.set(opt.label ?? '');

    this.close();
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

  protected displayLabel(): string {
    return this.selected()?.label ?? '';
  }

  private initActiveIndex(): void {
    const opts = this.filteredOptionRows();
    if (!opts.length) { this.activeIndex.set(-1); return; }

    const sel = this.selected();
    if (sel) {
      const idx = opts.findIndex(o => this.compareWith(o.value, sel.value));
      this.activeIndex.set(idx >= 0 ? idx : this.firstEnabledOptionIndex());
    } else {
      this.activeIndex.set(this.firstEnabledOptionIndex());
    }
  }

  private firstEnabledOptionIndex(): number {
    return this.filteredOptionRows().findIndex(o => !o.disabled);
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
        this.syncPanelInputs();
        return;
      }
    } while (idx !== start);
  }

  private selectActive(): void {
    const idx = this.activeIndex();
    const opt = this.filteredOptionRows()[idx];
    if (opt) this.selectOption(opt);
  }

  private syncPanelInputs(): void {
    const ref = this.overlayRef?.contentRef;
    if (!ref) return;

    ref.setInput('items', this.filteredItems());
    ref.setInput('selected', this._value());
    ref.setInput('activeIndex', this.activeIndex());
    ref.setInput('hasOptions', this.hasOptions());
    ref.changeDetectorRef.detectChanges();
  }

  private trimMetaEdges(items: AtlasOptionItem<T>[]): void {
    const isMeta = (it: AtlasOptionItem<T>) => it.kind === 'group' || it.kind === 'divider';
    while (items.length && isMeta(items[0])) items.shift();
    while (items.length && isMeta(items.at(-1)!)) items.pop();
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(ev: KeyboardEvent): void {
    if (this.disabled) return;

    switch (ev.key) {
      case 'ArrowDown':
        ev.preventDefault();
        this.open() ? this.moveActive(1) : this.openOverlay();
        break;

      case 'ArrowUp':
        ev.preventDefault();
        this.open() ? this.moveActive(-1) : this.openOverlay();
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

    const t = ev.target as Node;
    const insideHost = this.host.nativeElement.contains(t);
    const insidePanel = !!this.overlayRef?.panelEl?.contains(t);

    if (!insideHost && !insidePanel) this.close();
  }
}
