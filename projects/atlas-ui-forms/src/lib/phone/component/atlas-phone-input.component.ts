import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, } from '@angular/core';

import { AtlasInputDirective } from '../../input/directives/input.directive';
import { AtlasPhoneValue } from '../model/atlas-phone-value';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-phone-input',
  standalone: true,
  imports: [AtlasTranslationPipe, AtlasInputDirective],
  templateUrl: './atlas-phone-input.component.html',
  styleUrls: ['./atlas-phone-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasPhoneInputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tel', { read: ElementRef }) private readonly telRef?: ElementRef<HTMLInputElement>;
  @Input() public placeholder?: string;
  @Input() public value?: AtlasPhoneValue;
  @Input() public disabled = false;
  @Input() public preferE164 = true;
  @Output() readonly valueChange = new EventEmitter<AtlasPhoneValue>();

  private iti?: any;
  private removeCountryListener?: () => void;

  ngAfterViewInit(): void {
    (async () => {
      const input = this.telRef?.nativeElement;
      if (!input) return;

      const mod = await import('intl-tel-input');
      const intlTelInput = (mod as any).default ?? (mod as any);

      const initialCountry = this.pickInitialCountryIso2();

      this.iti = intlTelInput(input, {
        initialCountry,
        nationalMode: false,
        separateDialCode: true,
        autoPlaceholder: 'polite',
      });

      this.syncInputFromValue();

      const onCountryChange = () => this.emitValue();
      input.addEventListener('countrychange', onCountryChange);
      this.removeCountryListener = () =>
        input.removeEventListener('countrychange', onCountryChange);
    })();
  }

  ngOnDestroy(): void {
    this.removeCountryListener?.();
    this.iti?.destroy?.();
  }

  protected onUserInput(): void {
    this.emitValue();
  }

  protected canClear(): boolean {
    const v = this.value;
    return !this.disabled && !!(v?.e164 || v?.national || v?.international);
  }

  protected clear(ev?: Event): void {
    ev?.stopPropagation();
    if (this.disabled) return;

    const input = this.telRef?.nativeElement;
    input?.value && (input.value = '');

    this.valueChange.emit({
      e164: undefined,
      national: undefined,
      international: undefined,
      countryIso2: this.iti?.getSelectedCountryData?.()?.iso2,
      dialCode: this.iti?.getSelectedCountryData?.()?.dialCode,
      valid: false,
    });
  }

  private syncInputFromValue(): void {
    const input = this.telRef?.nativeElement;
    if (!input || !this.iti) return;

    const v = this.value;
    const toSet = v?.e164 || v?.international || v?.national || '';
    if (toSet) {
      this.iti.setNumber(toSet);
    } else {
      input.value = '';
    }
  }

  private emitValue(): void {
    if (!this.iti) return;

    const country = this.iti.getSelectedCountryData?.() ?? {};
    const e164 = this.safeGetNumber('E164');
    const intl = this.safeGetNumber('INTERNATIONAL');
    const nat = this.safeGetNumber('NATIONAL');

    const valid = this.safeIsValidNumber();

    const next: AtlasPhoneValue = {
      e164: e164 || undefined,
      international: intl || undefined,
      national: nat || undefined,
      countryIso2: country.iso2,
      dialCode: country.dialCode,
      valid,
    };

    this.valueChange.emit(next);
  }

  private safeIsValidNumber(): boolean {
    try {
      return !!this.iti?.isValidNumber?.();
    } catch {
      return false;
    }
  }

  private safeGetNumber(kind: 'E164' | 'INTERNATIONAL' | 'NATIONAL'): string {
    try {
      if (!this.iti?.getNumber) return '';
      const utils = (globalThis as any).intlTelInputUtils;
      if (!utils) return this.iti.getNumber() || '';
      const map: Record<string, number> = {
        E164: utils.numberFormat.E164,
        INTERNATIONAL: utils.numberFormat.INTERNATIONAL,
        NATIONAL: utils.numberFormat.NATIONAL,
      };
      return this.iti.getNumber(map[kind]) || '';
    } catch {
      return '';
    }
  }

  private pickInitialCountryIso2(): string {
    const locale =
      globalThis.Intl?.DateTimeFormat?.().resolvedOptions?.().locale ||
      globalThis.navigator?.language ||
      'en-US';

    const m = new RegExp(/[-_](\p{Alpha}{2}|\p{Alpha}{3})/u).exec(locale);
    const region = (m?.[1] ?? 'US').toLowerCase();
    return region.length === 2 ? region : 'us';
  }
}
