import intlTelInput from "intl-tel-input";

export type ItiInstance = ReturnType<typeof intlTelInput>;
export type CountryData = ReturnType<ItiInstance["getSelectedCountryData"]>;
export type ItiBaseOptions = NonNullable<Parameters<typeof intlTelInput>[1]>;
export type Iso2 = Exclude<ItiOptions["initialCountry"], "auto" | "" | undefined>;

export type ItiOptions = ItiBaseOptions & {
  preferredCountries?: string[];
  loadUtils?: () => Promise<any>;
};


export type IntlTelUtils = {
  numberFormat: { NATIONAL: number; INTERNATIONAL: number };
  numberType?: { MOBILE?: number };
  getExampleNumber?: (iso2: string, national: boolean, type?: number) => string | undefined;
};
