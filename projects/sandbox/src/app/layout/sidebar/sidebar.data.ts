export type SidebarBadge = 'new' | 'updated' | 'beta';

export type SidebarItem =
  | {
  kind: 'link';
  label: string;
  path: string;
  icon?: string;
  badge?: SidebarBadge;
  keywords?: string[];
}
  | {
  kind: 'group';
  label: string;
  icon?: string;
  children: SidebarItem[];
  keywords?: string[];
};

export const SIDEBAR_NAV: SidebarItem[] = [
  {
    kind: 'link',
    label: 'Home',
    path: '/',
    keywords: ['home', 'atlas', 'sandbox'],
  },
  {
    kind: 'group',
    label: 'Get Started',
    keywords: ['getting started', 'install', 'usage', 'setup'],
    children: [
      {
        kind: 'link',
        label: 'Installation',
        path: '/get-started/installation',
        keywords: ['install', 'npm', 'setup'],
      },
      {
        kind: 'link',
        label: 'Usage',
        path: '/get-started/usage',
        keywords: ['usage', 'how to', 'providers'],
      },
    ],
  },
  {
    kind: 'group',
    label: 'Components',
    keywords: ['components', 'ui', 'widgets'],
    children: [
      {
        kind: 'group',
        label: 'Notifications',
        keywords: ['toast', 'notification', 'snackbar'],
        children: [
          {
            kind: 'link',
            label: 'Toast',
            path: '/components/notifications/toast',
            badge: 'new',
            keywords: ['toast', 'notification', 'overlay', 'duration', 'actions'],
          },
        ],
      },
    ],
  },
  {
    kind: 'link',
    label: 'Updates',
    path: '/updates',
    keywords: ['changelog', 'releases', 'updates'],
  },
];

export type SidebarLink = {
  label: string;
  path: string;
  badge?: SidebarBadge;
  keywords: string[];
  sectionTrail: string[];
};

export function flattenSidebar(items: SidebarItem[], trail: string[] = []): SidebarLink[] {
  const out: SidebarLink[] = [];

  for (const item of items) {
    if (item.kind === 'link') {
      out.push({
        label: item.label,
        path: item.path,
        badge: item.badge,
        keywords: [item.label, ...(item.keywords ?? [])].map(s => s.toLowerCase()),
        sectionTrail: trail,
      });
    } else {
      out.push(...flattenSidebar(item.children, [...trail, item.label]));
    }
  }

  return out;
}
