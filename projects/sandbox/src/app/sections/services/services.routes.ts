import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  { path: '', redirectTo: 'translation', pathMatch: 'full' },
  {
    path: 'translation',
    loadComponent: () =>
      import('./pages/translation-doc/translation-doc.page').then(m => m.TranslationDocPage),
  },
];
