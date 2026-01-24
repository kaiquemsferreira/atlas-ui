import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasDialogService, AtlasFieldHintComponent, AtlasHintContentDirective, AtlasMenuComponent, AtlasMenuItemDirective,
  AtlasMenuSeparatorDirective, AtlasMenuTemplateDirective, AtlasMenuTriggerDirective } from 'atlas-ui-overlay';
import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent, AtlasTabCardComponent,
  AtlasTabCardSlotDirective } from 'atlas-ui-layout';
import { AtlasCodeTab, AtlasCodeTabsComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { OverlayDialogDemoComponent } from './demo/overlay-dialog-demo.component';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';


@Component({
  selector: 'sandbox-overlay-page',
  standalone: true,
  imports: [
    AtlasTranslationPipe,
    AtlasDocPageComponent,
    AtlasDocSectionComponent,
    AtlasTabCardComponent,
    AtlasTabCardSlotDirective,
    AtlasCodeTabsComponent,
    AtlasInlineCodeComponent,
    AtlasButtonDirective,
    AtlasMenuComponent,
    AtlasMenuComponent,
    AtlasMenuTemplateDirective,
    AtlasMenuItemDirective,
    AtlasMenuSeparatorDirective,
    AtlasFieldHintComponent,
    AtlasHintContentDirective,
    AtlasMenuTriggerDirective,
  ],
  templateUrl: './overlay-doc.page.html',
  styleUrls: ['./overlay-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayDocPage {
  protected readonly demoTabs: Array<{ id: string; labelKey?: string; label?: string }> = [
    { id: 'preview', labelKey: 'ui.common.ui.preview' },
    { id: 'code', labelKey: 'ui.common.ui.code' },
  ];
  protected readonly usageTs = `import { Component } from '@angular/core';

@Component({
  selector: 'example',
  standalone: true,
  templateUrl: './example.html',
})
export class ExampleComponent { }`;
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.overlay.title' },
  ];
  protected readonly usageHtml = `<div class="examples">

  <atlas-field-hint
    mode="tooltip"
    textKey="sandbox.pages.overlay.examples.tooltip.content">
  </atlas-field-hint>

  <atlas-field-hint mode="popover" placement="bottom" align="end">
    <ng-template atlasHintContent>
      <strong>Dicas</strong>
      <p>Use filtros como <code>status:ativo</code></p>
    </ng-template>
  </atlas-field-hint>

  <atlas-menu placement="bottom" align="start">
    <button atlas-button atlasMenuTrigger type="button" variant="outline" color="surface">
      Abrir menu
    </button>

    <ng-template atlasMenu>
      <button atlasMenuItem type="button">Buscar</button>
      <button atlasMenuItem type="button">Filtros</button>
      <div atlasMenuSeparator></div>
      <button atlasMenuItem type="button" [disabled]="true">Remover</button>
    </ng-template>
  </atlas-menu>

</div>`;
  protected readonly codeTabs: AtlasCodeTab[] = [
    { label: 'HTML', language: 'html', code: this.usageHtml },
    { label: 'TS', language: 'ts', code: this.usageTs },
  ];

  constructor(private readonly dialog: AtlasDialogService) {}

  public openDialog(): void {
    this.dialog.openComponent(OverlayDialogDemoComponent, {
      title: 'Dialog title',
      width: '50vw',
      height: '50vh',
      headerAlign: 'space-between',
      footerAlign: 'space-between',
      footerActions: [
        { textKey: 'ui.common.actions.cancel', variant: 'outline', color: 'surface', closeValue: false },
        { textKey: 'ui.common.actions.confirm', color: 'primary', closeValue: true, autoFocus: true },
      ],
    });
  }
}
