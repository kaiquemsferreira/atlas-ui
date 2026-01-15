import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasDocPageComponent, AtlasDocSectionComponent } from 'atlas-ui-layout';
import { AtlasCodeBlockComponent, AtlasCodeTabsComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';

type BreadcrumbItem = { labelKey: string; path: string };

@Component({
  selector: 'sandbox-card-doc-page',
  standalone: true,
  imports: [
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasInlineCodeComponent,
    AtlasCodeTabsComponent,
    AtlasCodeBlockComponent,
  ],
  templateUrl: './card-doc.page.html',
  styleUrls: ['./card-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocPage {
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.cards.title', path: '/components/card' },
  ];
  protected readonly basicUsageTabs = [
    {
      label: 'HTML',
      language: 'html',
      code: `<atlas-card variant="outlined" padding="md" [interactive]="true">
  <div atlasCardHeader>
    <h3>{{ 'sandbox.pages.cards.title' | translate }}</h3>
  </div>

  <div atlasCardContent>
    {{ 'sandbox.pages.cards.cardContentMessage' | translate }}
  </div>

  <div atlasCardFooter>
    <button class="btn btn--ghost" type="button">{{ 'ui.common.cancel' | translate }}</button>
    <button class="btn" type="button">{{ 'ui.common.confirm' | translate }}</button>
  </div>
</atlas-card>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `
variant: AtlasCardVariant = 'outlined';
padding: AtlasCardPadding = 'md';
interactive = true;`,
    },
  ];
  protected readonly slotsTabs = [
    {
      label: 'Slots',
      language: 'html',
      code: `
<div atlasCardHeader>...</div>

<div atlasCardContent>...</div>
<div atlasCardBody>...</div>

<div atlasCardFooter>...</div>

<div>Qualquer conteúdo sem directive de slot</div>`,
    },
    {
      label: 'Inputs',
      language: 'ts',
      code: `@Input() variant: AtlasCardVariant = 'default';
@Input() padding: AtlasCardPadding = 'md';
@Input() interactive = false;`,
    },
  ];
  protected readonly variantTabs = [
    {
      label: 'Default',
      language: 'html',
      code: `<atlas-card variant="default" padding="md">
  <div atlasCardContent>Default</div>
</atlas-card>`,
    },
    {
      label: 'Outlined',
      language: 'html',
      code: `<atlas-card variant="outlined" padding="md">
  <div atlasCardContent>Outlined</div>
</atlas-card>`,
    },
    {
      label: 'Muted',
      language: 'html',
      code: `<atlas-card variant="muted" padding="md">
  <div atlasCardContent>Muted</div>
</atlas-card>`,
    },
    {
      label: 'Glass',
      language: 'html',
      code: `<atlas-card variant="glass" padding="md">
  <div atlasCardContent>Glass</div>
</atlas-card>`,
    },
    {
      label: 'Elevated',
      language: 'html',
      code: `<atlas-card variant="elevated" padding="md">
  <div atlasCardContent>Elevated</div>
</atlas-card>`,
    },
  ];
  protected readonly a11yCode = `@Input() interactive = false;

@HostBinding('attr.tabindex')
get tabindex() { return this.interactive ? '0' : null; }

@HostBinding('attr.role')
get role() { return this.interactive ? 'button' : null; }

@HostListener('keydown', ['$event'])
onKeydown(e: KeyboardEvent) {
  if (!this.interactive) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
  }
}`;
}
