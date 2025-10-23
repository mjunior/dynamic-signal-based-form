import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';
import { FormFieldInputError } from '../form-field-input-error/form-field-input-error';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-field-input-text',
  standalone: true,
  imports: [FormFieldInputError, JsonPipe],
  template: `
    <label [for]="id()"
      >{{ label() }}
      @if(required()) { * }
    </label>
    <input
      type="text"
      [id]="id()"
      [attr.name]="id() || null"
      [attr.placeholder]="placeholder() || null"
      [required]="required()"
      [disabled]="disabled"
      [value]="value ?? ''"
      (input)="onTextInput($event)"
      (blur)="markAsTouched()"
    />
    <app-form-field-input-error
      [touched]="ngControl.touched"
      [errors]="ngControl.errors"
    />
  `,
  styleUrl: './form-field-input-text.css',
})
export class FormFieldInputText extends FormFieldBase<string> {
  constructor() {
    super();
  }

  onTextInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.emitChange(value);

    this.ngControl?.control;
  }
}
