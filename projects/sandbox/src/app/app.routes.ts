import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
      {
        path: 'components',
        loadChildren: () => import('./sections/components/components.routes').then(m => m.COMPONENTS_ROUTES),
      },
    ]
  }
];
