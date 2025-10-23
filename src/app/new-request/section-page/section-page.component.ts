import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { NewRequestStateService } from '../shared/state/new-request.service';
import { NgClass } from '@angular/common';
import { Field } from '../shared/new-request.types';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [NgClass],
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
          <p>{{ field.label }}</p>
        </div>
        }
      </div>
    </div>
  `,
  styleUrl: './section-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPageComponent implements OnInit {
  private state = inject(NewRequestStateService);
  currentSection = this.state.currentSection();

  fields = computed<Field[]>(() => {
    return this.currentSection?.fields || [];
  });


  schema = this.state.schemaSignal;

  ngOnInit(): void {
    console.log(this.schema());
  }

  isActiveSection(section: any): boolean {
    return this.currentSection?.id === section.id;
  }
}
