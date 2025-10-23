import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Schema } from '../shared/new-request.types';
import { SchemaService } from '../shared/services/schema.service';

@Component({
  selector: 'app-schema-selector',
  standalone: true,
  imports: [],
  template: `
    <div>
      <pre>
        {{ schemasSignal() }}
        @for (schema of schemasSignal(); track schema.id) {
          <button (click)="selectSchema(schema.id)"> {{ schema.title }} </button>
        }
      </pre>
    </div>
  `,
  styleUrl: './schema-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaSelectorComponent implements OnInit {
  private schemaService = inject(SchemaService);

  selectedSchemaSignal = signal<Schema | null>(null);
  schemasSignal = signal<Schema[] | null>(null);

  ngOnInit(): void {
    this.schemaService.getSchemas().subscribe((schemas) => {
      this.schemasSignal.set(schemas);
    });
  }

  selectSchema(schema: string): void {
      console.log('schema', schema)
  }
}
