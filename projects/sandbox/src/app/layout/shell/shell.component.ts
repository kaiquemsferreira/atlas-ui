import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { SIDEBAR_NAV, SidebarItem } from '../sidebar/sidebar.data';
import { ATLAS_I18N, AtlasTranslationPipe } from 'atlas-ui-i18n';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
    AtlasTranslationPipe,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {
  protected readonly filteredNavigation = computed((): SidebarItem[] => {
    const q = this.query().trim().toLowerCase();
    this.translateService.lang();
    if (!q) return this.navigation;

    const matches = (item: SidebarItem): boolean => {
      const label = this.t(item.labelKey).toLowerCase();
      const keywords = (item.keywords ?? []).join(' ').toLowerCase();

      return `${label} ${keywords}`.includes(q);
    };

    const filterTree = (items: SidebarItem[]): SidebarItem[] => {
      const out: SidebarItem[] = [];

      for (const item of items) {
        if (item.kind === 'link') {
          if (matches(item)) out.push(item);
          continue;
        }

        const children = filterTree(item.children);
        if (matches(item) || children.length > 0) {
          out.push({ ...item, children });
        }
      }

      return out;
    };

    return filterTree(this.navigation);
  });
  protected readonly mobileNavigationOpen = signal(false);
  protected readonly query = signal('');
  private readonly translateService = inject(ATLAS_I18N);
  protected readonly navigation: SidebarItem[] = SIDEBAR_NAV;
  protected themeIconClass = 'ph ph-moon';

  ngOnInit(): void {
    const root = document.documentElement;
    const current = root.dataset['atlasTheme'] ?? 'light';
    this.themeIconClass = current === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
  }

  protected t(key: string): string {
    return this.translateService.translate(key);
  }

  protected toggleTheme() {
    const root = document.documentElement;
    const current = root.dataset['atlasTheme'] ?? 'light';
    const next = current === 'light' ? 'dark' : 'light';

    root.dataset['atlasTheme'] = next;
    this.themeIconClass = next === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
  }

  protected closeMobileNavigation() {
    this.mobileNavigationOpen.set(false);
  }
}
