import { Injectable, inject } from '@angular/core';

import { AtlasParams } from '../api/model/atlas-params';
import { TranslocoService } from '@jsverse/transloco';
import { AtlasLang } from '../api/model/atlas-lang';
import { AtlasI18nInterface } from 'atlas-ui-i18n';
import { Observable } from 'rxjs';

@Injectable()
export class AtlasTranslocoI18nAdapter implements AtlasI18nInterface {
  private readonly translocoService = inject(TranslocoService);

  public lang(): AtlasLang {
    return this.translocoService.getActiveLang();
  }

  public setLang(lang: AtlasLang): void {
    this.translocoService.setActiveLang(lang);
  }

  public langChanges(): Observable<AtlasLang> {
    return this.translocoService.langChanges$;
  }

  public translate(key: string, params?: AtlasParams): string {
    return this.translocoService.translate(key, params);
  }

  public select(key: string, params?: AtlasParams): Observable<string> {
    return this.translocoService.selectTranslate(key, params);
  }

  public translate$(key: string, params?: AtlasParams): Observable<string> {
    return this.translocoService.selectTranslate(key, params);
  }
}
