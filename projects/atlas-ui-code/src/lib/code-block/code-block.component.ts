import { ChangeDetectionStrategy, Component, Input, inject, signal, OnChanges, SimpleChanges, OnDestroy, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AtlasCodeHighlightService } from '../highlight/atlas-code-highlight.service';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AtlasTranslationPipe
  ]
})
export class AtlasCodeBlockComponent implements OnChanges, OnDestroy {
  @Input() public code?: string;
  @Input() public title?: string;
  @Input() public language?: string;
  @Input() public wrap = false;
  @Input() public copyable = true;
  private readonly sanitizer = inject(DomSanitizer);
  private readonly highlighter = inject(AtlasCodeHighlightService);
  protected copied = signal(false);
  protected highlighted = signal<SafeHtml>('');
  private themeObserver?: MutationObserver;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] || changes['language']) {
      void this.render();
    }

    if (!this.themeObserver) {
      this.themeObserver = new MutationObserver(() => void this.render());
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-atlas-theme'],
      });
    }
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
  }

  protected normalizedCode(): string {
    const raw = this.code ?? '';
    return raw.replace(/^\n+/, '').replace(/\s+$/, '');
  }

  private async render(): Promise<void> {
    const raw = this.normalizedCode();
    if (!raw.trim()) {
      this.highlighted.set('');
      return;
    }

    const lang = (this.language ?? 'text').toLowerCase();
    const mode = (document.documentElement.dataset['atlasTheme'] ?? 'light') === 'dark' ? 'dark' : 'light';

    const html = await this.highlighter.highlight(raw, lang, mode);
    this.highlighted.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }

  protected async copy() {
    const raw = this.normalizedCode();
    if (!raw) return;

    await navigator.clipboard.writeText(raw);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1200);
  }
}
