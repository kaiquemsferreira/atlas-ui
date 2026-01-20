import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal, } from '@angular/core';

import { addMonths, inRange, isSameDay, startOfDay } from '../../utils/atlas-date.utils';
import { AtlasDateRange } from '../../model/atlas-date.types';
import { DayCell } from '../../model/atlas-date-cell.type';

@Component({
  selector: 'atlas-calendar',
  standalone: true,
  templateUrl: './atlas-calendar.component.html',
  styleUrls: ['./atlas-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCalendarComponent {
  private readonly _min = signal<Date | undefined>(undefined);
  private readonly _max = signal<Date | undefined>(undefined);
  private readonly _value = signal<Date | undefined>(undefined);
  private readonly _range = signal<AtlasDateRange | undefined>(undefined);
  private readonly _mode = signal<'single' | 'range'>('single');

  @Input()
  set min(v: Date | undefined) {
    this._min.set(v ? startOfDay(v) : undefined);
  }
  get min(): Date | undefined {
    return this._min();
  }

  @Input()
  set max(v: Date | undefined) {
    this._max.set(v ? startOfDay(v) : undefined);
  }
  get max(): Date | undefined {
    return this._max();
  }

  @Input()
  set value(v: Date | undefined) {
    this._value.set(v ? startOfDay(v) : undefined);
  }
  get value(): Date | undefined {
    return this._value();
  }

  @Input()
  set range(v: AtlasDateRange | undefined) {
    this._range.set(
      v
        ? {
          start: v.start ? startOfDay(v.start) : undefined,
          end: v.end ? startOfDay(v.end) : undefined,
        }
        : undefined
    );
  }
  get range(): AtlasDateRange | undefined {
    return this._range();
  }

  @Input()
  set mode(v: 'single' | 'range') {
    this._mode.set(v ?? 'single');
  }
  get mode(): 'single' | 'range' {
    return this._mode();
  }

  @Output() valueChange = new EventEmitter<Date>();
  @Output() rangeChange = new EventEmitter<AtlasDateRange>();

  protected readonly viewDate = signal<Date>(startOfDay(new Date()));

  protected readonly monthLabel = computed(() => {
    const d = this.viewDate();
    return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  });

  protected readonly weekdayLabels = computed(() => {
    const userLocale = globalThis.navigator?.languages?.[0]
      ?? globalThis.navigator?.language
      ?? 'en-US';

    const baseSunday = new Date(2024, 0, 7);
    const fmt = new Intl.DateTimeFormat(userLocale, { weekday: 'short' });

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(baseSunday);
      d.setDate(baseSunday.getDate() + i);
      return fmt.format(d).replace('.', '');
    });
  });

  protected readonly days = computed<DayCell[]>(() => {
    const base = this.viewDate();
    const year = base.getFullYear();
    const month = base.getMonth();

    const first = new Date(year, month, 1);
    const firstWeekday = first.getDay();
    const gridStart = new Date(year, month, 1 - firstWeekday);

    const today = startOfDay(new Date());

    const mode = this._mode();
    const selected = mode === 'single' ? this._value() : undefined;
    const r = mode === 'range' ? (this._range() ?? {}) : undefined;

    const minT = this._min() ? this._min()!.getTime() : -Infinity;
    const maxT = this._max() ? this._max()!.getTime() : Infinity;

    const out: DayCell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);

      const t = startOfDay(d).getTime();
      const disabled = t < minT || t > maxT;

      out.push({
        date: d,
        inMonth: d.getMonth() === month,
        isToday: isSameDay(d, today),
        disabled,
        selected: !!selected && isSameDay(d, selected),
        inRange: mode === 'range' ? inRange(d, r?.start, r?.end) : false,
        rangeStart: mode === 'range' ? isSameDay(d, r?.start) : false,
        rangeEnd: mode === 'range' ? isSameDay(d, r?.end) : false,
      });
    }

    return out;
  });

  protected prevMonth(): void {
    this.viewDate.set(addMonths(this.viewDate(), -1));
  }

  protected nextMonth(): void {
    this.viewDate.set(addMonths(this.viewDate(), 1));
  }

  protected onPick(day: DayCell): void {
    if (day.disabled) return;
    const picked = startOfDay(day.date);

    const mode = this._mode();
    if (mode === 'single') {
      this.valueChange.emit(picked);
      return;
    }

    const current = this._range() ?? {};
    const s = current.start ? startOfDay(current.start) : undefined;
    const e = current.end ? startOfDay(current.end) : undefined;

    if (!s || (s && e)) {
      this.rangeChange.emit({ start: picked, end: undefined });
      return;
    }

    if (picked.getTime() < s.getTime()) {
      this.rangeChange.emit({ start: picked, end: s });
    } else {
      this.rangeChange.emit({ start: s, end: picked });
    }
  }
}
