import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent, AtlasSkeletonComponent, AtlasTabCardComponent,
  AtlasTabCardSlotDirective } from 'atlas-ui-layout';

import { AtlasCodeTab, AtlasCodeTabsComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { DemoTab, SkeletonAnimation } from './model/skeleton-doc.type';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-loaders-skeleton-page',
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
    AtlasSkeletonComponent,
  ],
  templateUrl: './skeleton-doc.page.html',
  styleUrls: ['./skeleton-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDocPage {
  protected animation: SkeletonAnimation = 'wave';
  protected readonly usageHtml = `<atlas-skeleton width="12rem" height="1.2rem"></atlas-skeleton>

<atlas-skeleton variant="circle" size="3.6rem"></atlas-skeleton>

<atlas-skeleton variant="text" [lines]="3" lastLineWidth="70%"></atlas-skeleton>

<atlas-skeleton animation="pulse" width="100%" height="2.4rem"></atlas-skeleton>

<atlas-skeleton animation="none" width="8rem" height="1.2rem"></atlas-skeleton>`;
  protected readonly usageTs = `import { Component } from '@angular/core';

@Component({
  selector: 'example',
  standalone: true,
  templateUrl: './example.html',
})
export class ExampleComponent { }`;
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.skeleton.title' },
  ];
  protected readonly codeTabs: AtlasCodeTab[] = [
    { label: 'HTML', language: 'html', code: this.usageHtml },
    { label: 'TS', language: 'ts', code: this.usageTs },
  ];
  protected readonly demoTabs: DemoTab = [
    { id: 'preview', labelKey: 'ui.common.ui.preview' },
    { id: 'code', labelKey: 'ui.common.ui.code' },
  ];

  protected setAnimation(a: SkeletonAnimation): void {
    this.animation = a;
  }
}
