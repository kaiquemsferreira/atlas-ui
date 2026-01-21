import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { AtlasCardComponent } from '../../card/default/atlas-card.component';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-doc-section',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasCardComponent,
    NgTemplateOutlet
  ],
  templateUrl: './atlas-doc-section.component.html',
  styleUrls: ['./atlas-doc-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasDocSectionComponent {
  @Input() public title?: string;
  @Input() public titleKey?: string;
  @Input() public description?: string;
  @Input() public divider = true;
  @Input() public descriptionKey?: string;
  @Input() public cardPadding: 'md' | 'lg' = 'lg';
  @Input() public surface: 'plain' | 'card' = 'plain';
  @Input() public cardVariant: 'default' | 'muted' = 'default';
}
