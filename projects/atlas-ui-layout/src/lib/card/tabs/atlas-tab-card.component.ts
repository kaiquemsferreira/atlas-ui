import { ChangeDetectionStrategy, Component, computed, ContentChildren, Input, OnInit, QueryList, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { AtlasTabCardSlotDirective } from './directives/atlas-tab-card-slot.directive';
import { AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'atlas-tab-card',
  standalone: true,
  imports: [AtlasTranslationPipe, NgTemplateOutlet],
  templateUrl: './atlas-tab-card.component.html',
  styleUrls: ['./atlas-tab-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasTabCardComponent implements OnInit {
  @Input() initialTabId?: string;
  @Input({ required: true }) tabs: Array<{ id: string; labelKey?: string; label?: string }> = [];
  @ContentChildren(AtlasTabCardSlotDirective) private readonly slots?: QueryList<AtlasTabCardSlotDirective>;

  protected readonly activeId = signal<string>('');
  protected readonly activeTemplate = computed(() => {
    const id = this.activeId();
    const slot = this.slots?.find(s => s.id === id);
    return slot?.templateRef ?? null;
  });

  ngOnInit(): void {
    this.queueMicrotask();
  }

  private queueMicrotask(): void {
    queueMicrotask(() => {
      const first = this.tabs[0]?.id ?? '';
      const initial = this.initialTabId && this.tabs.some(t => t.id === this.initialTabId)
        ? this.initialTabId
        : first;
      this.activeId.set(initial);
    });
  }

  protected setTab(id: string): void {
    if (id === this.activeId()) return;
    this.activeId.set(id);
  }
}
