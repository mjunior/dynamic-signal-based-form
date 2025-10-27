import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NewRequestStateService } from '../shared/state/new-request.service';
import { Field } from '../shared/new-request.types';
import { SectionPageForm } from './section-page-form/section-page-form';
import { catchError, debounceTime, distinctUntilChanged, of, retry, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RequestService } from '../shared/services/requests.service';
import { ToastService } from '../../components/toast/toast.service';
import { SectionPageSidebarComponent, SidebarItem } from './section-page-sidebar/section-page-sidebar.component';
import { DsButtonComponent } from '../../components/ds-button/ds-button.component';
@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [
    CommonModule,
    SectionPageForm,
    SectionPageSidebarComponent,
    DsButtonComponent,
  ],
  template: `
    <div class="section-page flex h-screen max-w-5xl mx-auto mt-32">
      <div class="sidebar w-1/4">
        <app-section-page-sidebar
          [items]="sidebarItems()"
          [activeItemId]="currentSection()?.id ?? null"
        />
      </div>
      <div class="w-3/4">
        <app-section-page-form
          class="main w-full"
          [fields]="fields()"
          (formCreated)="onFormCreated($event)"
        >
          @if(form) { @if (currentSectionIndex() > 0) {
            <ds-button
              (click)="prevSection()"
              variant="secondary"
            >
              Previous
            </ds-button>
          }

          <ds-button
            (click)="nextSection()"
            [disabled]="form.invalid"
            variant="primary"
          >
            {{ isFinalSection() ? 'Submit' : 'Next' }}
          </ds-button>
          }
        </app-section-page-form>
      </div>
    </div>
  `,
  styleUrl: './section-page.component.scss',
})
export class SectionPageComponent {
  private state = inject(NewRequestStateService);
  private router = inject(Router);
  private requestService = inject(RequestService);
  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);
  form: FormGroup | null = null;

  currentSection = this.state.currentSection;
  currentSectionIndex = this.state.currentSectionIndexSignal;
  schema = this.state.schemaSignal;

  isFinalSection = computed(() => {
    return (
      this.currentSectionIndex() === (this.schema()?.sections.length || 0) - 1
    );
  });

  fields = computed<Field[]>(() => this.currentSection()?.fields || []);

  sidebarItems = computed<SidebarItem[]>(() => {
    return (
      this.schema()?.sections.map((section) => ({
        id: section.id,
        title: section.title,
      })) || []
    );
  });

  onSidebarItemClick(item: SidebarItem): void {
    const sectionIndex = this.schema()?.sections.findIndex(
      (s) => s.id === item.id
    );
    if (sectionIndex !== undefined && sectionIndex !== -1) {
      this.state.goToSection(sectionIndex);
      this.router.navigate([
        'new-request',
        'sections',
        this.schema()?.id,
        sectionIndex,
      ]);
    }
  }

  onFormCreated(form: FormGroup): void {
    this.form = form;
    if (this.state.isRequestInProgress()) {
      this.form.patchValue(
        this.state.answersBySection(this.currentSection()!.id)
      );
    }
    this.listenToFormChanges(this.form);
  }

  private listenToFormChanges(form: FormGroup): void {
    Object.entries(form.controls).forEach(([key, control]) => {
      control.valueChanges
        .pipe(
          tap((value) => {
            if (this.currentSection()) {
              this.state.saveAnswerLocally(
                this.currentSection()!.id,
                key,
                value
              );
            }
          }),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((value) => {
            this.toastService.show('info', 'Saving answer...');

            return this.requestService
              .updateQuestion('123', key, { value })
              .pipe(
                retry(1),
                catchError(() => {
                  return of({ success: false });
                })
              );
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((res) => {
          if (res?.success) {
            this.toastService.show('success', 'Saved successfully!');
          } else {
            this.toastService.show(
              'error',
              'Failed to save answer. Try again later.'
            );
          }
        });
    });
  }

  nextSection() {
    if (this.isFinalSection()) {
      this.router.navigate(['new-request', 'summary']);
      return;
    }

    this.state.nextSection();
    this.router.navigate([
      'new-request',
      'sections',
      this.schema()?.id,
      this.state.currentSectionIndexSignal(),
    ]);
  }

  prevSection() {
    this.state.previousSection();
    this.router.navigate([
      'new-request',
      'sections',
      this.schema()?.id,
      this.state.currentSectionIndexSignal(),
    ]);
  }
}
