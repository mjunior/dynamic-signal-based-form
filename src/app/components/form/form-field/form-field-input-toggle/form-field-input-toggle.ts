import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';
import { FormFieldInputError } from '../form-field-input-error/form-field-input-error';

@Component({
  selector: 'app-form-field-input-toggle',
  standalone: true,
  imports: [FormFieldInputError],
  template: `
    <label class="toggle">
      <input
        type="checkbox"
        [id]="id()"
        [attr.name]="id() || null"
        [required]="required()"
        [disabled]="disabled"
        [checked]="value ?? false"
        (change)="onToggleChange($event)"
        (blur)="markAsTouched()"
      />
      <span>{{ label() }}</span>
      <app-form-field-input-error
        [touched]="ngControl.touched"
        [errors]="ngControl.errors"
      />
    </label>
  `,
  styleUrl: './form-field-input-toggle.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldInputToggle extends FormFieldBase<boolean> {
  onToggleChange(event: Event): void {
    const { checked } = event.target as HTMLInputElement;
    this.emitChange(!!checked);
  }
}
