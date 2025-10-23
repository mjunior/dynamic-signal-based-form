import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-request-summary',
  standalone: true,
  imports: [],
  template: `<p>request-summary works!</p>`,
  styleUrl: './request-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestSummaryComponent { }
