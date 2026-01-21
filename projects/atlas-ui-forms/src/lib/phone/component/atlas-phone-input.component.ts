import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';

import type { CountryData, ItiInstance, Iso2, IntlTelUtils } from '../model/intl-tel-input.types';
import { AtlasInputDirective } from '../../input/directives/input.directive';
import { AtlasPhoneValue } from '../model/atlas-phone-value';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'atlas-phone-input',
  standalone: true,
  imports: [AtlasInputDirective],
  templateUrl: './atlas-phone-input.component.html',
  styleUrls: ['./atlas-phone-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasPhoneInputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tel', { static: true }) private readonly telRef!: ElementRef<HTMLInputElement>;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value?: string | AtlasPhoneValue;
  @Input() preferredCountries: Iso2[] = ['br', 'us'];
  @Output() readonly valueChange = new EventEmitter<AtlasPhoneValue | undefined>();

  private iti?: ItiInstance;
  private maxDigits: number | undefined;
  private readonly allowedChars = /^[0-9+\-\s().]*$/;

  private readonly onBeforeInput = (ev: InputEvent) => {
    if (ev.data && !this.allowedChars.test(ev.data)) ev.preventDefault();
  };

  private readonly onKeyDown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    const k = ev.key;
    const allowedControl = [
      'Backspace', 'Delete', 'Tab', 'Enter', 'Escape',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End',
    ];
    if (allowedControl.includes(k)) return;
    if (/^\d$/.test(k)) return;
    if (k === '+' || k === '-' || k === ' ' || k === '(' || k === ')' || k === '.') return;

    ev.preventDefault();
  };

  private readonly onPaste = (ev: ClipboardEvent) => {
    const text = ev.clipboardData?.getData('text') ?? '';
    if (!text) return;

    const sanitized = this.sanitize(text);
    if (sanitized !== text) {
      ev.preventDefault();
      this.insertAtCursor(sanitized);

      queueMicrotask(() => {
        this.enforceMaxDigits();
        this.emitValue();
      });
    }
  };

  private readonly onNativeInput = () => {
    this.sanitizeInPlace();
    this.enforceMaxDigits();
    this.emitValue();
  };

  private readonly onNativeCountryChange = () => {
    this.updateMaxDigits();
    this.enforceMaxDigits();
    this.emitValue();
  };

  ngAfterViewInit(): void {
    const input = this.telRef.nativeElement;

    const options: Record<string, unknown> = {
      initialCountry: this.getInitialCountry(),
      preferredCountries: this.preferredCountries,
      nationalMode: false,
      separateDialCode: false,
      autoPlaceholder: 'aggressive',
      formatOnDisplay: true,
      loadUtils: () => import('intl-tel-input/build/js/utils.js'),
    };

    this.iti = intlTelInput(input, options as unknown as any) as unknown as ItiInstance;

    if (this.placeholder?.trim()) {
      input.setAttribute('placeholder', this.placeholder);
    }

    input.addEventListener('beforeinput', this.onBeforeInput as any);
    input.addEventListener('keydown', this.onKeyDown);
    input.addEventListener('paste', this.onPaste);
    input.addEventListener('input', this.onNativeInput, { passive: true });
    input.addEventListener('blur', this.onNativeInput, { passive: true });
    input.addEventListener('countrychange', this.onNativeCountryChange as any);

    this.updateMaxDigits();
    this.syncFromInputValue();

    const itiAny = this.iti as any;
    const p: Promise<unknown> | undefined = itiAny?.promise;
    if (p?.then) {
      p.then(() => {
        this.updateMaxDigits();
        this.enforceMaxDigits();
        this.syncFromInputValue();
        this.emitValue();
      });
    } else {
      queueMicrotask(() => {
        this.updateMaxDigits();
        this.enforceMaxDigits();
        this.emitValue();
      });
    }
  }

  ngOnDestroy(): void {
    const input = this.telRef?.nativeElement;
    if (input) {
      input.removeEventListener('beforeinput', this.onBeforeInput as any);
      input.removeEventListener('keydown', this.onKeyDown);
      input.removeEventListener('paste', this.onPaste);

      input.removeEventListener('input', this.onNativeInput as any);
      input.removeEventListener('blur', this.onNativeInput as any);
      input.removeEventListener('countrychange', this.onNativeCountryChange as any);
    }
    this.iti?.destroy();
  }

  protected onWrapperClick(ev: MouseEvent): void {
    if (this.disabled) return;
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('.iti__dropdown-content')) return;
    this.telRef.nativeElement.focus();
  }

  protected focus(): void {
    if (this.disabled) return;
    this.telRef.nativeElement.focus();
  }

  private getUtils(): IntlTelUtils | undefined {
    return (globalThis as unknown as { intlTelInputUtils?: IntlTelUtils }).intlTelInputUtils;
  }

  private emitValue(): void {
    if (!this.iti) return;

    const input = this.telRef.nativeElement;
    const raw = input.value ?? '';

    if (!raw.trim()) {
      this.valueChange.emit(undefined);
      return;
    }

    const c: CountryData = this.iti.getSelectedCountryData();
    const e164 = this.safe(() => (this.iti as any).getNumber?.()) ?? raw;

    const u = this.getUtils();
    const national =
      this.safe(() => (u ? (this.iti as any).getNumber(u.numberFormat.NATIONAL) : '')) ?? '';
    const international =
      this.safe(() => (u ? (this.iti as any).getNumber(u.numberFormat.INTERNATIONAL) : '')) ?? '';

    const isValid = this.safe(() => (this.iti as any).isValidNumber?.()) ?? false;

    const out: AtlasPhoneValue = {
      e164,
      iso2: (c.iso2 ?? '').toLowerCase(),
      dialCode: String(c.dialCode ?? ''),
      national,
      international,
      raw,
      isValid,
    };

    this.valueChange.emit(out);
  }

  private syncFromInputValue(): void {
    if (!this.iti) return;
    const v = this.value;
    if (!v) return;
    const raw = typeof v === 'string' ? v : (v.e164 || v.raw);
    if (!raw) return;
    this.iti.setNumber(raw);
    this.updateMaxDigits();
    this.enforceMaxDigits();
  }

  private getInitialCountry(): Iso2 {
    const lang = globalThis?.navigator?.language ?? '';
    const region = lang.split('-')[1]?.toLowerCase() ?? 'us';
    return (region.length === 2 ? region : 'us') as Iso2;
  }

  private updateMaxDigits(): void {
    if (!this.iti) {
      this.maxDigits = undefined;
      return;
    }
    const c: CountryData = this.iti.getSelectedCountryData();
    const iso2 = (c.iso2 ?? '').toLowerCase();
    const u = this.getUtils();
    const dialDigits = String(c.dialCode ?? '').replace(/\D/g, '').length;
    const exNationalDigits = this.safe(() => {
      if (!u?.getExampleNumber) return undefined;
      const t = u.numberType?.MOBILE;
      const ex = u.getExampleNumber?.(iso2, true, t);
      if (!ex) return undefined;
      return (String(ex).match(/\d/g) ?? []).length;
    });
    if (exNationalDigits && exNationalDigits > 0) {
      this.maxDigits = dialDigits + exNationalDigits;
      return;
    }
    const ph = this.telRef.nativeElement.getAttribute('placeholder') ?? '';
    const digits = (ph.match(/\d/g) ?? []).length;
    this.maxDigits = digits > 0 ? digits : undefined;
  }

  private enforceMaxDigits(): void {
    const max = this.maxDigits;
    if (!max) return;
    const input = this.telRef.nativeElement;
    const v = input.value ?? '';
    const sanitized = this.sanitize(v);

    const digits = (sanitized.match(/\d/g) ?? []).length;
    if (digits <= max) {
      if (sanitized !== v) input.value = sanitized;
      return;
    }

    let digitCount = 0;
    let out = '';
    for (const ch of sanitized) {
      if (/\d/.test(ch)) {
        if (digitCount >= max) break;
        digitCount++;
      }
      out += ch;
    }
    input.value = out;
  }

  private sanitizeInPlace(): void {
    const input = this.telRef.nativeElement;
    const v = input.value ?? '';
    const s = this.sanitize(v);
    if (s !== v) input.value = s;
  }

  private sanitize(v: string): string {
    let s = v.replace(/[^\d+\-\s().]/g, '');
    s = s.replace(/\+/g, (m, offset) => (offset === 0 ? '+' : ''));
    return s;
  }

  private insertAtCursor(text: string): void {
    const input = this.telRef.nativeElement;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const before = input.value.slice(0, start);
    const after = input.value.slice(end);
    input.value = before + text + after;
    const pos = start + text.length;
    input.setSelectionRange(pos, pos);
  }

  private safe<T>(fn: () => T): T | undefined {
    try {return fn() }
    catch { return undefined }
  }
}
