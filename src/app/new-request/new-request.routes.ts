import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/new-request/schema-selector', pathMatch: 'full' },
  {
    path: 'schema-selector',
    loadComponent: () => import('./schema-selector/schema-selector.component').then((c) => c.SchemaSelectorComponent)
  },
  {
    path: 'sections/:schemaId',
    loadComponent: () => import('./section-page/section-page.component').then((c) => c.SectionPageComponent)
  },
  {
    path: 'summary',
    loadComponent: () => import('./request-summary/request-summary.component').then((c) => c.RequestSummaryComponent)
  }
];
