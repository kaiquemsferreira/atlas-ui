import { Injectable, inject } from '@angular/core';

import { ATLAS_I18N_CONFIGURATION, ATLAS_I18N_CONTRIBUTIONS } from 'atlas-ui-i18n';
import { AtlasI18nContributions } from '../api/model/atlas-i18n-contributions';
import { TranslocoLoader } from '@jsverse/transloco';
import { ATLAS_UI_EN_US } from '../i18n/en-us/ui';
import { ATLAS_UI_PT_BR } from '../i18n/pt-br/ui';
import { Dict } from './model/dict.type';
import { of, Observable } from 'rxjs';

@Injectable()
export class AtlasTranslocoLoader implements TranslocoLoader {
  private readonly contributions = inject(ATLAS_I18N_CONTRIBUTIONS, { optional: true });
  private readonly configuration = inject(ATLAS_I18N_CONFIGURATION);

  public getTranslation(lang: string): Observable<Dict> {
    const uiScope = this.configuration.uiScope ?? 'ui';
    const norm = lang.toLowerCase();

    const uiDict = norm === 'pt-br'
      ? ATLAS_UI_PT_BR
      : ATLAS_UI_EN_US;

    const base: Dict = {
      [uiScope]: uiDict,
    };

    const merged = deepMerge(base, this.pickContributionsFor(lang, this.contributions ?? []));

    return of(merged);
  }

  private pickContributionsFor(lang: string, stacks: AtlasI18nContributions[]): Dict {
    const out: Dict = {};
    const norm = lang.toLowerCase();

    for (const stack of stacks) {
      const exact = stack?.[lang];
      const normalized = stack?.[norm];

      if (exact) deepMerge(out, exact);
      if (normalized) deepMerge(out, normalized);
    }

    return out;
  }
}

function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = (target as any)[key];

    if (isPlainObject(tv) && isPlainObject(sv)) {
      deepMerge(tv, sv);
    } else {
      (target as any)[key] = sv;
    }
  }
  return target;
}

function isPlainObject(v: unknown): v is Record<string, any> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}
