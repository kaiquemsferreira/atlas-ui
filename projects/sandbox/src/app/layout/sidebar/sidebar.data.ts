export type SidebarBadge = 'new' | 'updated' | 'beta';

export type SidebarItem =
  | {
  kind: 'link';
  labelKey: string;
  path: string;
  badge?: SidebarBadge;
  keywords?: string[];
}
  | {
  kind: 'group';
  labelKey: string;
  children: SidebarItem[];
  keywords?: string[];
};

export const SIDEBAR_NAV: SidebarItem[] = [
  {
    kind: 'link',
    labelKey: 'sandbox.nav.home',
    path: '/',
    keywords: [
      'home',
      'atlas',
      'sandbox'
    ]
  },
  {
    kind: 'group',
    labelKey: 'sandbox.nav.getStarted',
    children: [
      { kind: 'link', labelKey: 'sandbox.nav.installation', path: '/get-started/installation' },
      { kind: 'link', labelKey: 'sandbox.nav.usage', path: '/get-started/usage' },
    ],
  },
  {
    kind: 'group',
    labelKey: 'sandbox.nav.components',
    children: [
      {
        kind: 'link',
        labelKey: 'sandbox.pages.cards.title',
        path: '/components/cards',
        badge: 'new'
      },
      {
        kind: 'link',
        labelKey: 'sandbox.pages.buttons.title',
        path: '/components/buttons',
        badge: 'new',
      },
      {
        kind: 'group',
        labelKey: 'sandbox.pages.inputs.title',
        children: [
          { kind: 'link', labelKey: 'sandbox.pages.inputs.title', path: '/components/inputs/text', badge: 'new' },
          { kind: 'link', labelKey: 'sandbox.pages.datePicker.title', path: '/components/inputs/date', badge: 'new' },
          { kind: 'link', labelKey: 'sandbox.pages.phoneInput.title', path: '/components/inputs/phone', badge: 'new' },
          { kind: 'link', labelKey: 'sandbox.pages.fileUpload.title', path: '/components/inputs/file-upload', badge: 'beta' },
        ]
      },
      {
        kind: 'group',
        labelKey: 'sandbox.nav.notifications',
        children: [
          { kind: 'link', labelKey: 'sandbox.pages.toast.title', path: '/components/notifications/toast', badge: 'new' }
        ],
      }
    ],
  },
  {
    kind: 'group',
    labelKey: 'sandbox.nav.services',
    keywords: ['services', 'service', 'i18n', 'translation'],
    children: [
      {
        kind: 'link',
        labelKey: 'sandbox.nav.translation',
        path: '/services/translation',
        badge: 'new',
        keywords: ['translation', 'i18n', 'transloco', 'atlas', 'keys'],
      },
    ],
  },
  {
    kind: 'link',
    labelKey: 'sandbox.nav.updates',
    path: '/updates'
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
        label: item.labelKey,
        path: item.path,
        badge: item.badge,
        keywords: [item.labelKey, ...(item.keywords ?? [])].map(s => s.toLowerCase()),
        sectionTrail: trail,
      });
    } else {
      out.push(...flattenSidebar(item.children, [...trail, item.labelKey]));
    }
  }

  return out;
}
