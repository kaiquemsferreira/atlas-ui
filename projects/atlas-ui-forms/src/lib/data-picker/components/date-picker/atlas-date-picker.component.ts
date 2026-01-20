import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output,
  computed, effect, inject, signal, } from '@angular/core';

import { AtlasDatePickerRegistry } from '../../service/atlas-date-picker-registry.service';
import { AtlasDateRange, AtlasDatePickerMode } from '../../model/atlas-date.types';
import { AtlasCalendarComponent } from '../calendar/atlas-calendar.component';
import { startOfDay } from '../../utils/atlas-date.utils';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-date-picker',
  standalone: true,
  imports: [AtlasTranslationPipe, AtlasCalendarComponent, AtlasButtonDirective],
  templateUrl: './atlas-date-picker.component.html',
  styleUrls: ['./atlas-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasDatePickerComponent {
  private readonly id = crypto.randomUUID();
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly registry = inject(AtlasDatePickerRegistry);

  @Input() public min?: Date;
  @Input() public max?: Date;
  @Input() public disabled = false;

  private readonly _mode = signal<AtlasDatePickerMode>('single');
  @Input() set mode(v: AtlasDatePickerMode) {
    this._mode.set(v ?? 'single');
  }
  get mode(): AtlasDatePickerMode {
    return this._mode();
  }

  private readonly _value = signal<Date | AtlasDateRange | undefined>(undefined);
  @Input() set value(v: Date | AtlasDateRange | undefined) {
    this._value.set(v);
  }
  get value(): Date | AtlasDateRange | undefined {
    return this._value();
  }

  @Output() valueChange = new EventEmitter<Date | AtlasDateRange | undefined>();

  protected readonly open = signal(false);
  protected readonly draftSingle = signal<Date | undefined>(undefined);
  protected readonly draftRange = signal<AtlasDateRange>({});

  protected readonly hasValue = computed(() => {
    const v = this._value();
    const m = this._mode();

    if (!v) return false;

    if (m === 'single') return v instanceof Date;

    const r = v as AtlasDateRange;
    return !!(r?.start || r?.end);
  });

  protected readonly label = computed(() => {
    const v = this._value();
    const m = this._mode();
    if (!v) return '';

    if (m === 'single') {
      const d = v instanceof Date ? v : undefined;
      return d ? this.formatDate(d) : '';
    }

    const r = v as AtlasDateRange;
    const a = r?.start ? this.formatDate(r.start) : '';
    const b = r?.end ? this.formatDate(r.end) : '';
    return a && b ? `${a} - ${b}` : a;
  });

  constructor() {
    this.runEffect();
  }

  private runEffect(): void {
    effect(() => {
      const openId = this.registry.openId();
      if (openId !== this.id && this.open()) this.close();
    });
  }

  protected toggle(ev?: Event): void {
    ev?.stopPropagation();
    if (this.disabled) return;

    const next = !this.open();
    if (next) {
      this.registry.setOpen(this.id);
      this.open.set(true);
      this.syncDraftFromValue();
    } else {
      this.close();
    }
  }

  protected close(): void {
    this.open.set(false);
    if (this.registry.openId() === this.id) this.registry.setOpen(null);
  }

  private syncDraftFromValue(): void {
    const m = this._mode();
    const v = this._value();

    if (m === 'single') {
      const d = v instanceof Date ? v : undefined;
      this.draftSingle.set(d ? startOfDay(new Date(d)) : undefined);
      return;
    }

    const r = v && !(v instanceof Date) ? (v) : undefined;
    this.draftRange.set({
      start: r?.start ? startOfDay(new Date(r.start)) : undefined,
      end: r?.end ? startOfDay(new Date(r.end)) : undefined,
    });
  }

  protected onDraftSingleChange(d: Date): void {
    this.draftSingle.set(startOfDay(d));
  }

  protected onDraftRangeChange(r: AtlasDateRange): void {
    this.draftRange.set({
      start: r.start ? startOfDay(r.start) : undefined,
      end: r.end ? startOfDay(r.end) : undefined,
    });
  }

  protected cancel(): void {
    this.syncDraftFromValue();
    this.close();
  }

  protected apply(): void {
    const m = this._mode();

    if (m === 'single') {
      const d = this.draftSingle();
      this._value.set(d ? new Date(d) : undefined);
      this.valueChange.emit(d ? new Date(d) : undefined);
      this.close();
      return;
    }

    const r = this.draftRange();
    const next: AtlasDateRange = {
      start: r.start ? new Date(r.start) : undefined,
      end: r.end ? new Date(r.end) : undefined,
    };

    this._value.set(next);
    this.valueChange.emit(next);
    this.close();
  }

  protected clear(ev?: Event): void {
    ev?.stopPropagation();
    if (this.disabled) return;

    const m = this._mode();
    const next = m === 'single' ? undefined : ({ start: undefined, end: undefined } as AtlasDateRange);

    this._value.set(next);
    this.valueChange.emit(next);
    this.close();
  }

  protected canClear(): boolean {
    if (this.disabled) return false;

    const v = this._value();
    const m = this._mode();

    if (!v) return false;

    if (m === 'single') return v instanceof Date;

    const r = v as AtlasDateRange;
    return !!(r?.start || r?.end);
  }

  private formatDate(d: Date): string {
    const locale = this.getUserLocale();
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d);
  }

  private getUserLocale(): string {
    const nav = globalThis.navigator as Navigator | undefined;
    return nav?.languages?.[0] ?? nav?.language ?? 'en-US';
  }

  @HostListener('document:click', ['$event'])
  protected onDocClick(ev: MouseEvent): void {
    if (!this.open()) return;
    if (!this.host.nativeElement.contains(ev.target as Node)) this.close();
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocKeyDown(ev: KeyboardEvent): void {
    if (!this.open()) return;
    if (ev.key === 'Escape') this.cancel();
  }
}
