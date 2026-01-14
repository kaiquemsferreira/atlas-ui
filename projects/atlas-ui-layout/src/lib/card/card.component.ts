import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, Input, inject, } from '@angular/core';

import { AtlasCardBodySlotDirective, AtlasCardContentSlotDirective, AtlasCardFooterSlotDirective,
  AtlasCardHeaderSlotDirective } from './directives/card-slots.directive';
import { AtlasCardVariant } from './model/atlas-card-variant';
import { AtlasCardPadding } from './model/atlas-card-padding';
import { ATLAS_CARD_DEFAULTS } from './model/card.token';

@Component({
  selector: 'atlas-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCardComponent {
  @HostBinding('attr.tabindex') get tabindex() { return this.interactive ? '0' : null; }
  @HostBinding('attr.role') get role() { return this.interactive ? 'button' : null; }
  @HostBinding('attr.data-variant') get dataVariant() { return this.variant; }
  @HostBinding('attr.data-padding') get dataPadding() { return this.padding; }
  @HostBinding('class.atlas-card') readonly hostClass = true;
  @ContentChild(AtlasCardContentSlotDirective) contentSlot?: AtlasCardContentSlotDirective;
  @ContentChild(AtlasCardHeaderSlotDirective) headerSlot?: AtlasCardHeaderSlotDirective;
  @ContentChild(AtlasCardFooterSlotDirective) footerSlot?: AtlasCardFooterSlotDirective;
  @ContentChild(AtlasCardBodySlotDirective) bodySlot?: AtlasCardBodySlotDirective;
  private readonly defaults = inject(ATLAS_CARD_DEFAULTS);
  @Input() variant: AtlasCardVariant = this.defaults.variant;
  @Input() padding: AtlasCardPadding = this.defaults.padding;
  @Input() interactive = false;

  protected hasHeader() { return !!this.headerSlot; }
  protected hasFooter() { return !!this.footerSlot; }
}
