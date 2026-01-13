import { Pipe, PipeTransform, inject } from '@angular/core';

import { AtlasParams } from '../api/model/atlas-params';
import { ATLAS_I18N } from 'atlas-ui-i18n';


@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class AtlasTranslationPipe implements PipeTransform {
  private readonly translateService = inject(ATLAS_I18N);

  public transform(key: string, params?: AtlasParams): string {
    return this.translateService.translate(key, params);
  }
}
