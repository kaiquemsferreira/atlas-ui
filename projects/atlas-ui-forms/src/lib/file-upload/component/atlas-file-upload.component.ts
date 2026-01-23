import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input,
  Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AtlasFileUploadMode, AtlasFileUploadLayout, AtlasFileUploadSelector,
  AtlasUploadItem } from '../model/atlas-file-upload.types';
import { AtlasPrefixIconDirective } from '../../form-field/directives/prefix-icon.directive';
import { AtlasFormFieldComponent } from '../../form-field/atlas-form-field.component';
import { AtlasSuffixDirective } from '../../form-field/directives/suffix.directive';
import { AtlasInputDirective } from '../../input/directives/input.directive';
import { AtlasButtonDirective } from 'atlas-ui-button';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';


@Component({
  selector: 'atlas-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AtlasTranslationPipe,
    AtlasButtonDirective,
    AtlasFormFieldComponent,
    AtlasInputDirective,
    AtlasPrefixIconDirective,
    AtlasSuffixDirective,
  ],
  templateUrl: './atlas-file-upload.component.html',
  styleUrls: ['./atlas-file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasFileUploadComponent {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  @Input() maxFiles?: number;
  @Input() maxSizeMb?: number;
  @Input() helperText?: string;
  @Input() urlValue = '';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() enableUrl = false;
  @Input() items: AtlasUploadItem[] = [];
  @Input() accept: string | string[] = [];
  @Input() showDialogHeader = true;
  @Input() showDialogFooter = false;
  @Input() mode: AtlasFileUploadMode | null = null;
  @Input() layout: AtlasFileUploadLayout = 'inline';
  @Input() selector: AtlasFileUploadSelector = 'dropzone';
  @Input() dialogTitleKey = 'ui.components.upload.dialog.title';
  @Input() cancelActionKey = 'ui.components.upload.dialog.cancel';
  @Input() primaryActionKey = 'ui.components.upload.dialog.primary';
  @Input() urlPlaceholderKey = 'ui.components.upload.url.placeholder';

  @Output() retry = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() cancelAction = new EventEmitter<void>();
  @Output() primaryAction = new EventEmitter<void>();
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() cancelEvent = new EventEmitter<string>();
  @Output() urlSubmitted = new EventEmitter<string>();
  @Output() urlValueChange = new EventEmitter<string>();

  protected dragOver = false;

  @HostBinding('attr.data-disabled')
  get dataDisabled() {
    return this.disabled ? 'true' : 'false';
  }

  get effectiveLayout(): AtlasFileUploadLayout {
    const m = this.mode;
    if (!m) return this.layout;
    return m === 'dialog' ? 'dialog' : 'inline';
  }

  get effectiveSelector(): AtlasFileUploadSelector {
    const m = this.mode;
    if (!m) return this.selector;
    if (m === 'compact') return 'compact';
    return 'dropzone';
  }

  get effectiveEnableUrl(): boolean {
    const m = this.mode;
    if (!m) return this.enableUrl;
    return m === 'url' || m === 'dialog';
  }

  private normalizeAcceptToken(token: string): string | null {
    const t = token.trim();
    if (!t) return null;
    if (/^[a-z]+\/\*$/.test(t)) return t.toLowerCase();
    if (/^[a-z0-9.+-]+\/[a-z0-9.+-]+$/i.test(t)) return t.toLowerCase();
    if (t.startsWith('.')) return t.toLowerCase();
    if (/^[a-z0-9]+$/i.test(t)) return `.${t.toLowerCase()}`;

    return null;
  }

  get acceptAttr(): string | null {
    const tokens = (Array.isArray(this.accept) ? this.accept : (this.accept ?? '').split(','))
      .flatMap((v) => (v.split(',')))
      .map((t) => this.normalizeAcceptToken(t))
      .filter((t): t is string => !!t);

    const unique = Array.from(new Set(tokens));
    return unique.length ? unique.join(',') : null;
  }

  get acceptedFormatsLabel(): string {
    const tokens = (this.acceptAttr || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (!tokens.length) return '';

    const mapped = tokens.map((t) => this.mapAcceptTokenToLabel(t));
    const unique = Array.from(new Set(mapped));
    const limit = 6;
    const sliced = unique.slice(0, limit);
    const suffix = unique.length > limit ? '…' : '';

    return `${sliced.join(', ')}${suffix}`;
  }

  private mapAcceptTokenToLabel(token: string): string {
    const t = token.toLowerCase();
    if (t === 'image/*') return 'Images';
    if (t === 'video/*') return 'Videos';
    if (t === 'audio/*') return 'Audio';
    const mimeMap: Record<string, string> = {
      'image/jpeg': 'JPEG',
      'image/jpg': 'JPG',
      'image/png': 'PNG',
      'image/webp': 'WEBP',
      'image/gif': 'GIF',
      'application/pdf': 'PDF',
      'text/csv': 'CSV',
    };
    if (mimeMap[t]) return mimeMap[t];
    if (t.startsWith('.')) return t.slice(1).toUpperCase();
    if (t.includes('/')) return t.split('/')[1].toUpperCase();

    return token.toUpperCase();
  }

  public onBrowseClick(): void {
    if (this.disabled) return;
    this.fileInput.nativeElement.click();
  }

  public onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.handleFiles(files);
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled) return;
    this.dragOver = false;

    const files = Array.from(event.dataTransfer?.files ?? []);
    this.handleFiles(files);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled) return;
    this.dragOver = true;
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  public onKeyActivate(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onBrowseClick();
    }
  }

  public submitUrl(): void {
    if (this.disabled) return;
    const value = (this.urlValue ?? '').trim();
    if (!value) return;
    this.urlSubmitted.emit(value);
  }

  public setUrlValue(v: string): void {
    this.urlValue = v;
    this.urlValueChange.emit(v);
  }

  public removeItem(id: string): void {
    this.remove.emit(id);
  }

  public cancelItem(id: string): void {
    this.cancelEvent.emit(id);
  }

  public retryItem(id: string): void {
    this.retry.emit(id);
  }

  private handleFiles(incoming: File[]): void {
    if (!incoming.length) return;

    let files = incoming;

    if (!this.multiple) {
      files = files.slice(0, 1);
    } else if (this.maxFiles != null) {
      files = files.slice(0, this.maxFiles);
    }

    const valid = files.filter((f) => this.isValidFile(f));

    if (valid.length) {
      this.filesSelected.emit(valid);
    }
  }

  private isValidFile(file: File): boolean {
    if (this.maxSizeMb != null) {
      const maxBytes = this.maxSizeMb * 1024 * 1024;
      if (file.size > maxBytes) return false;
    }

    if (!this.acceptAttr) return true;

    const acceptTokens = this.acceptAttr
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const fileName = file.name.toLowerCase();
    const mime = (file.type || '').toLowerCase();

    return acceptTokens.some((token) => {
      if (token === '*/*') return true;

      if (token.endsWith('/*')) {
        const prefix = token.slice(0, token.indexOf('/'));
        return mime.startsWith(prefix + '/');
      }

      if (token.startsWith('.')) {
        return fileName.endsWith(token);
      }

      return mime === token;
    });
  }

  public formatBytes(bytes?: number): string {
    if (bytes == null) return '';
    if (bytes < 1024) return `${bytes} B`;

    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;

    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;

    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  }

  public progressLabel(item: AtlasUploadItem): string {
    const p = item.progress ?? 0;
    const sent = item.transferredBytes == null ? '' : this.formatBytes(item.transferredBytes);
    const total = item.sizeBytes == null ? '' : this.formatBytes(item.sizeBytes);

    if (sent && total) return `${p}% • ${sent} / ${total}`;
    if (total) return `${p}% • ${total}`;
    return `${p}%`;
  }
}
