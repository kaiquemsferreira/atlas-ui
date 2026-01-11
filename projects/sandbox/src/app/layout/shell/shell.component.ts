import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { SIDEBAR_NAV, SidebarItem } from '../sidebar/sidebar.data';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  protected readonly mobileNavigationOpen = signal(false);
  protected readonly query = signal('');
  protected readonly navigation: SidebarItem[] = SIDEBAR_NAV;
  protected themeIconClass = 'ph ph-sun';

  protected readonly filteredNavigation = computed((): SidebarItem[] => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.navigation;

    const matches = (item: SidebarItem): boolean => {
      const haystack = [item.label, ...(item.keywords ?? [])].join(' ').toLowerCase();
      return haystack.includes(q);
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

  protected toggleTheme() {
    const root = document.documentElement;
    const current = root.dataset['atlasTheme'] ?? 'light';
    const next = current === 'light' ? 'dark' : 'light';

    root.dataset['atlasTheme'] = next;
    this.themeIconClass = next === 'dark' ? 'ph ph-moon' : 'ph ph-sun';
  }

  protected closeMobileNavigation() {
    this.mobileNavigationOpen.set(false);
  }
}
