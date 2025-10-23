import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [],
  template: `<p>section-page works!</p>`,
  styleUrl: './section-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPage { }
