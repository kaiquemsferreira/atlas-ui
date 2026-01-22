import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '', redirectTo: 'notifications/toast', pathMatch: 'full'
  },
  {
    path: 'notifications/toast',
    loadComponent: () => import('./pages/toast-doc/toast-doc.page')
      .then(m => m.ToastDocPage)
  },
  {
    path: 'buttons',
    loadComponent: () => import('./pages/button-doc/buttons-doc.page')
      .then(m => m.ButtonsDocPage)
  },
  {
    path: 'inputs/text',
    loadComponent: () => import('./pages/input-doc/text/inputs-doc.page')
      .then(m => m.InputsDocPage)
  },
  {
    path: 'inputs/date',
    loadComponent: () => import('./pages/input-doc/date-picker/input-date-picker-doc.page')
      .then(m => m.InputDatePickerDocPage)
  },
  {
    path: 'inputs/phone',
    loadComponent: () => import('./pages/input-doc/phone/input-phone-doc.page')
      .then(m => m.InputPhoneDocPage)
  },
  {
    path: 'inputs/file-upload',
    loadComponent: () => import('./pages/input-doc/file-upload/input-file-upload-doc.page')
      .then(m => m.InputFileUploadDocPage)
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/card-doc/card-doc.page')
      .then(m => m.CardDocPage)
  },
  {
    path: 'skeleton',
    loadComponent: () => import('./pages/skeleton-doc/skeleton-doc.page')
      .then(m => m.SkeletonDocPage)
  }
];

