import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, Input, inject, } from '@angular/core';

import { AtlasCardBodySlotDirective, AtlasCardContentSlotDirective, AtlasCardFooterSlotDirective,
  AtlasCardHeaderSlotDirective } from './directives/atlas-card-slots.directive';
import { ATLAS_CARD_DEFAULTS } from './model/atlas-card.token';
import { AtlasCardVariant } from './model/atlas-card-variant';
import { AtlasCardPadding } from './model/atlas-card-padding';

@Component({
  selector: 'atlas-card',
  standalone: true,
  templateUrl: './atlas-card.component.html',
  styleUrls: ['./atlas-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCardComponent {
  private readonly defaults = inject(ATLAS_CARD_DEFAULTS);

  @Input() public interactive = false;
  @Input() public variant: AtlasCardVariant = this.defaults.variant;
  @Input() public padding: AtlasCardPadding = this.defaults.padding;

  @HostBinding('class.atlas-card') readonly hostClass = true;
  @HostBinding('attr.data-variant') get dataVariant() { return this.variant; }
  @HostBinding('attr.data-padding') get dataPadding() { return this.padding; }
  @HostBinding('attr.role') get role() { return this.interactive ? 'button' : null; }
  @HostBinding('attr.tabindex') get tabindex() { return this.interactive ? '0' : null; }

  @ContentChild(AtlasCardBodySlotDirective) bodySlot?: AtlasCardBodySlotDirective;
  @ContentChild(AtlasCardHeaderSlotDirective) headerSlot?: AtlasCardHeaderSlotDirective;
  @ContentChild(AtlasCardFooterSlotDirective) footerSlot?: AtlasCardFooterSlotDirective;
  @ContentChild(AtlasCardContentSlotDirective) contentSlot?: AtlasCardContentSlotDirective;

  protected hasHeader() { return !!this.headerSlot; }
  protected hasFooter() { return !!this.footerSlot; }
}
