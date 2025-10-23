import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [],
  template: `<p>section-page works!</p>`,
  styleUrl: './section-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPageComponent { }
