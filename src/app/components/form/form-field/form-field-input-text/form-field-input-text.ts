import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';
import { FormFieldInputError } from '../form-field-input-error/form-field-input-error';

@Component({
  selector: 'app-form-field-input-text',
  standalone: true,
  imports: [FormFieldInputError],
  template: `
    <div class="flex flex-col gap-2 w-full">
      <label [for]="id()" class="text-sm font-medium text-gray-700">
        {{ label() }}
        @if(required()) {
        <span class="text-red-500">*</span>
        }
      </label>
      <input
        [type]="type()"
        [id]="id()"
        [attr.name]="id() || null"
        [attr.placeholder]="placeholder() || null"
        [required]="required()"
        [disabled]="disabled"
        [value]="value ?? ''"
        (input)="onTextInput($event)"
        (blur)="emitBlur($event)"
        class="input"
      />
      <app-form-field-input-error
        [touched]="ngControl.touched"
        [errors]="ngControl.errors"
      />
    </div>
  `,
  styleUrl: './form-field-input-text.scss',
})
export class FormFieldInputText extends FormFieldBase<string> {
  type = input<string>('text');

  constructor() {
    super();
  }

  onTextInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.emitChange(value);

    this.ngControl?.control;
  }
}
