import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AtlasBreadcrumbItem } from '../model/atlas-breadcrumb-item';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    AtlasTranslationPipe
  ],
  templateUrl: './atlas-breadcrumb.component.html',
  styleUrls: ['./atlas-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasBreadcrumbComponent {
  @Input() public ariaLabel?: string;
  @Input() public ariaLabelKey?: string;
  @Input({ required: true }) public items: AtlasBreadcrumbItem[] = [];

  protected isLast(index: number): boolean {
    return index === this.items.length - 1;
  }
}
