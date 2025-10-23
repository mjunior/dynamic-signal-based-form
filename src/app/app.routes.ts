import { Routes } from '@angular/router';
import { NewRequestComponent } from './new-request/new-request.component';

export const routes: Routes = [
  { path: '', redirectTo: '/new-request', pathMatch: 'full' },
  {
    path: 'new-request',
    component: NewRequestComponent,
    loadChildren: () => import('./new-request/new-request.routes').then((m) => m.routes),
  },
];
