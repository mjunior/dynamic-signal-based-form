import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './new-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRequestComponent { }
