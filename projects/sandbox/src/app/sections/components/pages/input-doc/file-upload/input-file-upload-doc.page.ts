import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AtlasBreadcrumbItem, AtlasDocPageComponent, AtlasDocSectionComponent, AtlasTabCardComponent,
  AtlasTabCardSlotDirective } from 'atlas-ui-layout';
import { AtlasCodeTab, AtlasCodeTabsComponent, AtlasInlineCodeComponent } from 'atlas-ui-code';
import { AtlasFileUploadComponent, AtlasUploadItem } from 'atlas-ui-forms';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'sandbox-inputs-date-picker-page',
  standalone: true,
  templateUrl: './input-file-upload-doc.page.html',
  styleUrls: ['./input-file-upload-doc.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AtlasFileUploadComponent,
    AtlasDocPageComponent,
    AtlasButtonDirective,
    AtlasDocSectionComponent,
    AtlasTabCardComponent,
    AtlasTabCardSlotDirective,
    AtlasTranslationPipe,
    AtlasCodeTabsComponent,
    AtlasInlineCodeComponent
  ]
})
export class InputFileUploadDocPage {
  protected isDisabled = false;
  protected isUploadingMock = true;

  protected readonly demoTabs: Array<{ id: string; labelKey?: string; label?: string }> = [
    { id: 'preview', labelKey: 'ui.common.ui.preview' },
    { id: 'code', labelKey: 'ui.common.ui.code' },
  ];
  protected readonly acceptImagesAndDocs = ['.pdf', '.docx'];
  protected readonly breadcrumbs: AtlasBreadcrumbItem[] = [
    { labelKey: 'sandbox.nav.components', path: '/components' },
    { labelKey: 'sandbox.pages.fileUpload.title' },
  ];
  protected readonly acceptDocsOnly = ['.pdf', '.docx', '.pptx'];
  private readonly doneItems: AtlasUploadItem[] = [
    { id: '1', name: 'document.pdf', status: 'success', progress: 100, sizeBytes: 6_200_000, transferredBytes: 6_200_000 },
    { id: '2', name: 'photo.png', status: 'success', progress: 100, sizeBytes: 1_200_000, transferredBytes: 1_200_000 },
  ];
  protected readonly acceptImagesOnly = ['image/*'];

  protected get items(): AtlasUploadItem[] {
    if (!this.isUploadingMock) return this.doneItems;

    return [
      {
        id: '1',
        name: 'document.pdf',
        status: 'uploading',
        progress: 62,
        transferredBytes: 3_800_000,
        sizeBytes: 6_200_000,
      },
      {
        id: '2',
        name: 'photo.png',
        status: 'queued',
        progress: 0,
        transferredBytes: 0,
        sizeBytes: 1_200_000,
      },
      {
        id: '3',
        name: 'slides.pptx',
        status: 'error',
        errorKey: 'sandbox.pages.fileUpload.errors.failed',
      },
    ];
  }

  protected readonly usageHtml = `<atlas-file-upload
  layout="dialog"
  selector="dropzone"
  [enableUrl]="true"
  [accept]="['image/*', '.pdf', '.docx']"
  [maxSizeMb]="50"
  [multiple]="true"
  [items]="items"
  (filesSelected)="onFilesSelected($event)"
  (urlSubmitted)="onUrlSubmitted($event)"
  (remove)="onRemove($event)"
  (cancelEvent)="onCancel($event)"
  (retry)="onRetry($event)"
/>`;

  protected readonly usageTs = `import { Component } from '@angular/core';
import { AtlasUploadItem } from 'atlas-ui-forms';

@Component({
  selector: 'example',
  standalone: true,
  templateUrl: './example.html',
})
export class ExampleComponent {
  items: AtlasUploadItem[] = [];

  onFilesSelected(files: File[]) {
    // envie para seu adapter/porta de upload
  }

  onUrlSubmitted(url: string) {
    // envie a URL para o backend
  }

  onRemove(id: string) {}
  onCancel(id: string) {}
  onRetry(id: string) {}
}`;

  protected readonly codeTabs: AtlasCodeTab[] = [
    { label: 'HTML', language: 'html', code: this.usageHtml },
    { label: 'TS', language: 'ts', code: this.usageTs },
  ];

  protected toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  protected toggleUploading(): void {
    this.isUploadingMock = !this.isUploadingMock;
  }

  protected onFilesSelected(files: File[]): void {
    console.log('filesSelected', files);
  }

  protected onUrlSubmitted(url: string): void {
    console.log('urlSubmitted', url);
  }

  protected onRemove(id: string): void {
    console.log('remove', id);
  }

  protected onCancel(id: string): void {
    console.log('cancel', id);
  }

  protected onRetry(id: string): void {
    console.log('retry', id);
  }

  protected onPrimary(): void {
    console.log('primaryAction');
  }

  protected onCancelDialog(): void {
    console.log('cancelAction');
  }
}
