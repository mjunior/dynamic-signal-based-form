import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormFieldBase } from '../form-field-base';

@Component({
  selector: 'app-form-field-input-text',
  standalone: true,
  template: `
    <label [for]="id()">{{ label() }}</label>
    <input
      type="text"
      [id]="id()"
      [attr.name]="id() || null"
      [attr.placeholder]="placeholder() || null"
      [required]="required()"
      [disabled]="disabled"
      [value]="value"
      (input)="onTextInput($event)"
      (blur)="markAsTouched()"
    />
  `,
  styleUrl: './form-field-input-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldInputText,
      multi: true,
    },
  ],
})
export class FormFieldInputText extends FormFieldBase {}