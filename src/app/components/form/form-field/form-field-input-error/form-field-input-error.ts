import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-field-input-error',
  standalone: true,
  imports: [JsonPipe],
  template: `<div>
    <p class="error">
      @if(touched() && errors()) {
        {{ getErrros() }}
      }
    </p>
  </div>`,
  styleUrl: './form-field-input-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldInputError {
  touched = input<boolean | null>();
  errors = input<ValidationErrors | null>();

  getErrros() {
    if (this.errors()?.['required']) {
      return 'Required field';
    } else {
      return '';
    }
  }
}
