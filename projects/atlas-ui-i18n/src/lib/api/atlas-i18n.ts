import { AtlasParams } from './model/atlas-params';
import { AtlasLang } from './model/atlas-lang';
import { Observable } from 'rxjs';

export interface AtlasI18n {
  lang(): AtlasLang;
  setLang(lang: AtlasLang): void;
  langChanges(): Observable<AtlasLang>;
  translate(key: string, params?: AtlasParams): string;
  select(key: string, params?: AtlasParams): Observable<string>;
  translate$(key: string, params?: AtlasParams): Observable<string>;
}
