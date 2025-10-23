import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Schema } from '../shared/new-request.types';
import { SchemaService } from '../shared/services/schema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schema-selector',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>What do you need to purchase ?</h1>
      @for (schema of schemasSignal(); track schema.id) {
        <button (click)="selectSchema(schema)">{{ schema.title }}</button>
      }

      <button (click)="start()">Start</button>

    </div>
  `,
  styleUrl: './schema-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaSelectorComponent implements OnInit {
  private schemaService = inject(SchemaService);
  private router = inject(Router);

  selectedSchemaSignal = signal<Schema | null>(null);
  schemasSignal = signal<Schema[] | null>(null);

  ngOnInit(): void {
    this.schemaService.getSchemas().subscribe((schemas) => {
      this.schemasSignal.set(schemas);
    });
  }

  selectSchema(schema: Schema): void {
    this.selectedSchemaSignal.set(schema);
  }

  start(): void {
    if (!this.selectedSchemaSignal()){
      return
    };

    this.router.navigate(['new-request/sections', this.selectedSchemaSignal()?.id]);
  }
}
