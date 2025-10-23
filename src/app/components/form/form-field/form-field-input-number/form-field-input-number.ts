import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';

@Component({
  selector: 'app-form-field-input-number',
  standalone: true,
  template: `
    <label [for]="id()">{{ label() }}</label>
    <input
      type="number"
      [id]="id()"
      [attr.name]="id() || null"
      [attr.placeholder]="placeholder() || null"
      [required]="required()"
      [disabled]="disabled"
      [value]="value ?? ''"
      (input)="onNumberInput($event)"
      (blur)="markAsTouched()"
    />
  `,
  styleUrl: './form-field-input-number.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldInputNumber,
      multi: true,
    },
  ],
})
export class FormFieldInputNumber extends FormFieldBase<number | null> {
  onNumberInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    if (value === '') {
      this.emitChange(null);
      return;
    }
    const parsed = Number(value);
    this.emitChange(Number.isNaN(parsed) ? null : parsed);
  }
}
