import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { NewRequestStateService } from '../shared/state/new-request.service';
import { NgClass } from '@angular/common';
import { Field } from '../shared/new-request.types';
import { Router } from '@angular/router';
import { FormFieldComponent } from '../../components/form/form-field/form-field.component';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [NgClass, FormFieldComponent],
  template: `
    <div class="section-page">
      <div class="sidebar">
        @for(section of schema()?.sections; track section.id) {
        <p [ngClass]="{ active: isActiveSection(section) }">
          {{ section.title }}
        </p>
        }
      </div>
      <div class="main">
        @for (field of fields(); track field.id) {
          <div>
            <app-form-field-component
              [type]="field.type"
              [label]="field.label"
            />
          </div>
        }

        <button (click)="prevSection()">Prev</button>
        <button (click)="nextSection()">Next</button>
      </div>
    </div>
  `,
  styleUrl: './section-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPageComponent implements OnInit {
  private state = inject(NewRequestStateService);
  private router = inject(Router);

  currentSection = this.state.currentSection;

  fields = computed<Field[]>(() => {
    return this.currentSection()?.fields || [];
  });

  schema = this.state.schemaSignal;

  ngOnInit(): void {
    console.log(this.schema());
  }

  isActiveSection(section: any): boolean {
    return this.currentSection()?.id === section.id;
  }

  nextSection() {
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
