// shared/state/new-request.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Schema } from '../new-request.types';

@Injectable({
  providedIn: 'root',
})
export class NewRequestStateService {

  private _schema = signal<Schema | null>(null);
  private _currentSectionIndex = signal<number>(0);
  private _answersBySection = signal<any>({});


  readonly schemaSignal = this._schema.asReadonly();
  readonly currentSectionIndexSignal = this._currentSectionIndex.asReadonly();
  readonly answersBySectionSginal = this._answersBySection.asReadonly();

  readonly currentSection = computed(() => {
    const schema = this._schema();
    const index = this._currentSectionIndex();
    return schema?.sections[index] ?? null;
  });

  readonly currentSectionAnswers = computed(() => {
    const index = this._currentSectionIndex();
    return this._answersBySection()[index] ?? {};
  });


  startNewRequest(schema: Schema): void {
    this._schema.set(schema);
    this._currentSectionIndex.set(0);
    this._answersBySection.set({});
  }

  
  nextSection(): void {
    this._currentSectionIndex.update((i) => i + 1);
  }

  previousSection(): void {
    this._currentSectionIndex.update((i) => i - 1);
  }
}
