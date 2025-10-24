import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NewRequestStateService } from '../shared/state/new-request.service';
import { Field } from '../shared/new-request.types';
import { SectionPageForm } from './section-page-form/section-page-form';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [CommonModule, NgClass, SectionPageForm, NgIf],
  template: `
    <div class="section-page">
      <div class="sidebar">
        @for(section of schema()?.sections; track section.id) {
        <p [ngClass]="{ active: isActiveSection(section) }">
          {{ section.title }}
        </p>
        }
      </div>

      <app-section-page-form
        class="main"
        [fields]="fields()"
        (formCreated)="onFormCreated($event)"
      >
        @if(form) {
        <button type="button" (click)="prevSection()">Prev</button>

        <button type="button" (click)="nextSection()" [disabled]="form.invalid">
          {{ isFinalSection() ? 'Submit' : 'Next' }}
        </button>
        }
      </app-section-page-form>
    </div>
  `,
  styleUrl: './section-page.component.scss',
})
export class SectionPageComponent {
  private state = inject(NewRequestStateService);
  private router = inject(Router);

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

  onFormCreated(form: FormGroup): void {
    console.log('form created');
    this.form = form;
    this.form.value;
    this.listenToFormChanges(this.form)
  }

  isActiveSection(section: any): boolean {
    return this.currentSection()?.id === section.id;
  }

  private listenToFormChanges(form: FormGroup): void {
    Object.entries(form.controls).forEach(([key, control]) => {
      control.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe((value) => {
          console.log(`Campo "${key}" alterado:`, value);
        });
    });
  }

  nextSection() {
    if (this.isFinalSection()) {
      console.log(this.form?.value);
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
