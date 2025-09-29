import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'firebase-demo',
    loadComponent: () => import('./components/firebase-demo.component').then(c => c.FirebaseDemoComponent)
  },
  {
    path: '',
    redirectTo: '/firebase-demo',
    pathMatch: 'full'
  }
];
