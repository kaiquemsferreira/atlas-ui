import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  { path: '', redirectTo: 'notifications/toast', pathMatch: 'full' },
  { path: 'notifications/toast', loadComponent: () => import('./pages/toast-doc/toast-doc.page').then(m => m.ToastDocPage) },
  { path: 'buttons', loadComponent: () => import('./pages/button-doc/buttons-doc.page').then(m => m.ButtonsDocPage) },
  { path: 'inputs', loadComponent: () => import('./pages/input-doc/inputs-doc.page').then(m => m.InputsDocPage) },
  { path: 'cards', loadComponent: () => import('./pages/card-doc/card-doc.page').then(m => m.CardDocPage) },
];

