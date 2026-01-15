import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AtlasBreadcrumbItem } from './model/atlas-breadcrumb-item';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    AtlasTranslationPipe
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasBreadcrumbComponent {
  @Input({ required: true }) items: AtlasBreadcrumbItem[] = [];
  @Input() ariaLabelKey?: string;
  @Input() ariaLabel?: string;

  protected isLast(index: number): boolean {
    return index === this.items.length - 1;
  }
}
