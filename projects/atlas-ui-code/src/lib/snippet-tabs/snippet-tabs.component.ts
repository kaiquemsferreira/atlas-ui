import { ChangeDetectionStrategy, Component, Input, OnChanges, signal } from '@angular/core';
import { AtlasSnippetTab } from './model/snippet-tabs.types';

@Component({
  selector: 'atlas-snippet-tabs',
  standalone: true,
  templateUrl: './snippet-tabs.component.html',
  styleUrls: ['./snippet-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasSnippetTabsComponent implements OnChanges {
  @Input() initialLabel?: string;
  @Input() copyable = true;
  @Input({ required: true }) tabs: AtlasSnippetTab[] = [];
  protected copied = signal(false);
  protected activeIndex = signal(0);

  ngOnChanges(): void {
    if (!this.tabs?.length) return;

    if (this.initialLabel) {
      const idx = this.tabs.findIndex(t => t.label.toLowerCase() === this.initialLabel!.toLowerCase());
      if (idx >= 0) this.activeIndex.set(idx);
    } else {
      this.activeIndex.set(0);
    }
  }

  protected select(i: number) {
    this.activeIndex.set(i);
    this.copied.set(false);
  }

  protected active() {
    return this.tabs[this.activeIndex()] ?? null;
  }

  protected async copy() {
    const current = this.active();
    if (!this.copyable || !current?.value) return;

    await navigator.clipboard.writeText(current.value);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 4000);
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
}
