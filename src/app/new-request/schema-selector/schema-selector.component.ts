import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { Schema } from '../shared/new-request.types';
import { SchemaService } from '../shared/services/schema.service';
import { Router } from '@angular/router';
import { NewRequestStateService } from '../shared/state/new-request.service';
import { ChipSelectorComponent, ChipOption } from '../../components/chip-selector/chip-selector.component';
import { DsButtonComponent } from '../../components/ds-button/ds-button.component';

@Component({
  selector: 'app-schema-selector',
  standalone: true,
  imports: [ChipSelectorComponent, DsButtonComponent],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="schema-selector">
        <h1 class="text-lg font-semibold mb-6">
          What do you need to purchase?
        </h1>

        <div class="w-full flex flex-col items-center justify-center">
          <app-chip-selector
            [options]="chipOptions()"
            [selected]="selectedSchemaId()"
            (selectionChange)="onSchemaSelect($event)"
          />

          <div class="mt-8 w-full max-w-[200px]">
            <ds-button
              (click)="start()"
              [disabled]="!selectedSchemaSignal()"
              variant="primary"
              size="fluid"
            >
              Start
            </ds-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './schema-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaSelectorComponent implements OnInit {
  private schemaService = inject(SchemaService);
  private router = inject(Router);
  private state = inject(NewRequestStateService);
  selectedSchemaSignal = signal<Schema | null>(null);
  schemasSignal = signal<Schema[]>([]);

  // Computed signal for chip options
  chipOptions = computed<ChipOption[]>(() => {
    return this.schemasSignal().map((schema) => ({
      id: schema.id,
      label: schema.title,
      value: schema.id,
    }));
  });

  // Computed signal for selected schema ID
  selectedSchemaId = computed<string | null>(() => {
    return this.selectedSchemaSignal()?.id ?? null;
  });

  ngOnInit(): void {
    this.schemaService.getSchemas().subscribe((schemas) => {
      this.schemasSignal.set(schemas);
    });
  }

  onSchemaSelect(schemaId: string | null): void {
    if (schemaId) {
      const schema = this.schemasSignal().find((s) => s.id === schemaId);
      this.selectedSchemaSignal.set(schema ?? null);
    } else {
      this.selectedSchemaSignal.set(null);
    }
  }

  start(): void {
    const schema = this.selectedSchemaSignal();
    if (!schema) {
      return;
    }

    this.state.startNewRequest(schema);
    this.router.navigate(['new-request/sections', schema.id, 0]);
  }
}
