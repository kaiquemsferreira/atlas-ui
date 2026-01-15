import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy,
  SimpleChanges, inject, signal, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AtlasCodeHighlightService } from '../highlight/atlas-code-highlight.service';
import { AtlasCodeTab } from './model/code-tabs.types';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-code-tabs',
  imports: [AtlasTranslationPipe],
  standalone: true,
  templateUrl: './code-tabs.component.html',
  styleUrls: ['./code-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCodeTabsComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() public title?: string;
  @Input() public wrap = false;
  @Input() public initialLabel?: string;
  @Input() public copyable = true;
  @Input({ required: true }) public tabs: AtlasCodeTab[] = [];
  private readonly highlighter = inject(AtlasCodeHighlightService);
  private readonly sanitizer = inject(DomSanitizer);
  protected copied = signal(false);
  protected activeIndex = signal(0);
  protected highlighted = signal<SafeHtml>('');
  private themeObserver?: MutationObserver;
  private renderSeq = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs'] || changes['initialLabel']) {
      this.initActive();
      void this.render();
    }
  }

  ngAfterViewInit(): void {
    this.themeObserver = new MutationObserver(() => {
      void this.render();
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-atlas-theme'],
    });
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
  }

  private initActive(): void {
    if (!this.tabs?.length) return;

    if (this.initialLabel) {
      const idx = this.tabs.findIndex(
        t => t.label.toLowerCase() === this.initialLabel!.toLowerCase()
      );
      this.activeIndex.set(Math.max(idx, 0));
      return;
    }

    this.activeIndex.set(0);
  }

  protected select(i: number) {
    this.activeIndex.set(i);
    this.copied.set(false);
    void this.render();
  }

  protected active(): AtlasCodeTab | null {
    return this.tabs[this.activeIndex()] ?? null;
  }

  protected async copy() {
    const a = this.active();
    if (!this.copyable || !a?.code) return;

    await navigator.clipboard.writeText(this.normalize(a.code));
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1000);
  }

  protected onKeydown(e: KeyboardEvent) {
    const len = this.tabs.length;
    if (!len) return;

    const idx = this.activeIndex();

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.select((idx + 1) % len);
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.select((idx - 1 + len) % len);
    }
  }

  private normalize(code: string): string {
    return (code ?? '').replace(/^\n+/, '').replace(/\s+$/, '');
  }

  private async render(): Promise<void> {
    const seq = ++this.renderSeq;
    const a = this.active();
    if (!a) {
      this.highlighted.set('');
      return;
    }

    const raw = this.normalize(a.code);
    if (!raw.trim()) {
      this.highlighted.set('');
      return;
    }

    const mode = (document.documentElement.dataset['atlasTheme'] ?? 'light') === 'dark' ? 'dark' : 'light';

    const html = await this.highlighter.highlight(
      raw,
      a.language?.toLowerCase() ?? 'text',
      mode
    );

    if (seq !== this.renderSeq) return;
    this.highlighted.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }
}
