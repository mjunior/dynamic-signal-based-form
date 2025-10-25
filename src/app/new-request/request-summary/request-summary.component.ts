import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { NewRequestStateService } from '../shared/state/new-request.service';
import { Schema } from '../shared/new-request.types';
import { DsButtonComponent } from '../../components/ds-button/ds-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-summary',
  standalone: true,
  imports: [DsButtonComponent],
  template: `
    <div
      class="section-page flex max-w-4xl mx-auto mt-32 bg-white p-8 rounded-lg"
    >
      <div class="request-summary-container w-full text-center">
        <div class="flex flex-col gap-2 items-center justify-center mt-8">
          <img src="cupcake.png" alt="cupcake" />
          <h1 class="text-2xl font-bold">Awesome</h1>
          <p class="text-gray-500">It works!</p>
        </div>
        <div class="summary-answers mt-8">
          <h2 class="text-sm text-left text-gray-500">Summary</h2>
        </div>
        @for (answer of summaryAnswers(); track answer.id) {
        <div
          class="flex gap-2 items-center justify-center mt-8 border-b border-gray-200 pb-4 text-sm"
        >
          <div class="w-3/4 text-left">{{ answer.label }}</div>
          <div class="w-1/4 text-left" [class.text-gray-300]="!answer.value">{{ answer.value ?? 'Not answered' }}</div>
        </div>
        }
        <footer class="flex items-center justify-center mt-8">
          <ds-button variant="primary" class="w-full" (click)="resetRequest()"
            >Complete the flow and Reset</ds-button
          >
        </footer>
      </div>
    </div>
  `,
  styleUrl: './request-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestSummaryComponent  {
  private state = inject(NewRequestStateService);
  private schema = this.state.schemaSignal;
  private router = inject(Router);
  
  summaryAnswers = computed(() => {
    return Object.values(this.schema()?.sections || {}).reduce(
      (acc, section) => {
        const sectionAnswers = section.fields.map((field) => ({
          id: field.id,
          label: field.label,
          value: this.state.answersById(field.id),
        }));
        return acc.concat(sectionAnswers);
      },
      [] as any[]
    );
  });

  resetRequest(): void {
    this.state.resetRequest();
    this.router.navigate(['new-request']);
  }
}