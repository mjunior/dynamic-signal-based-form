import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { NewRequestStateService } from '../shared/state/new-request.service';
import { Schema } from '../shared/new-request.types';

@Component({
  selector: 'app-request-summary',
  standalone: true,
  imports: [],
  template: `
  
  <div>
    @for (answer of summaryAnswers(); track answer.id) {
      <p>{{ answer.label }} - {{ answer.value }}</p>
    }
  </div>
  `,
  styleUrl: './request-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestSummaryComponent implements OnInit {
  private state = inject(NewRequestStateService);
  summaryAnswers = computed(() => {
    let flatAnswers: any[] = [];
    Object.values(this.state.answersBySectionSginal()).forEach((answers: any) => {
      Object.keys(answers).forEach((questionId: string) => {
        flatAnswers.push({
          id: questionId,
          label: this.deepFindQuestionById(Number(questionId))?.label,
          value: answers[questionId],
        });
      });
    });
    return flatAnswers;
  });
  
  schema = computed(() => this.state.schemaSignal());

  ngOnInit(): void {
    console.log('request-summary component initialized', this.summaryAnswers());
   }


  private deepFindQuestionById(id: number) {
    return this.schema()?.sections.flatMap(section => section.fields).find(field => field.id === id);
  }
}