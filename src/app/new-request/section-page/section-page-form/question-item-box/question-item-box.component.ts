import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-item-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="question-item-box">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './question-item-box.component.scss',
})
export class QuestionItemBoxComponent {}

