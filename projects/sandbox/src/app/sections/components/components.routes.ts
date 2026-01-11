import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  { path: '', redirectTo: 'notifications/toast', pathMatch: 'full' },
  { path: 'notifications/toast', loadComponent: () => import('./pages/toast-doc/toast-doc.page').then(m => m.ToastDocPage) },
];

