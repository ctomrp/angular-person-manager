import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/person-list/person-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/person-form/person-form.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/person-form/person-form.component'),
  },
  {
    path: 'delete/:id',
    loadComponent: () =>
      import('./components/person-form/person-form.component'),
  },
];
