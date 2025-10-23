import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NewRequestStateService } from '../shared/state/new-request.service';
import { Field } from '../shared/new-request.types';
import { SectionPageForm } from './section-page-form/section-page-form';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [CommonModule, NgClass, SectionPageForm],
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
            Next
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
  schema = this.state.schemaSignal;

  fields = computed<Field[]>(() => this.currentSection()?.fields || []);

  onFormCreated(form: FormGroup): void {
    console.log('form created');
    this.form = form;
  }

  isActiveSection(section: any): boolean {
    return this.currentSection()?.id === section.id;
  }

  nextSection() {
    if (this.form) {
      console.log('Form value:', this.form.value);
      console.log('form valid', this.form.valid);
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
