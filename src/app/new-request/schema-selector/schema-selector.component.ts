import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-schema-selector',
  standalone: true,
  imports: [],
  template: `<p>schema-selector works!</p>`,
  styleUrl: './schema-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaSelectorComponent { }
