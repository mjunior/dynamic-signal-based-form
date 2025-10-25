import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { NewRequestStateService } from './shared/state/new-request.service';
const shouldHasRequestInProgress = () => {
  const state = inject(NewRequestStateService);
  const router = inject(Router);
  if (state.isRequestInProgress()) {
    return true;
  }
  router.navigate(['new-request/schema-selector']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: '/new-request/schema-selector', pathMatch: 'full' },
  {
    path: 'schema-selector',
    loadComponent: () => import('./schema-selector/schema-selector.component').then((c) => c.SchemaSelectorComponent)
  },
  {
    path: 'sections/:schemaId/:sectionIndex',
    canActivate: [shouldHasRequestInProgress],
    loadComponent: () => import('./section-page/section-page.component').then((c) => c.SectionPageComponent)
  },
  {
    path: 'summary',
    canActivate: [shouldHasRequestInProgress],
    loadComponent: () => import('./request-summary/request-summary.component').then((c) => c.RequestSummaryComponent)
  }
];
