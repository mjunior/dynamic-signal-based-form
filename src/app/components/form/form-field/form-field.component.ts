import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

type FieldType = 'text' | 'number' | 'radio' | 'toggle';

@Component({
  selector: 'app-form-field-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (type() === 'text') {
    <label for="">{{ label() }}</label>
    <input type="text" />
    }

    <!-- NUMBER -->
    @if (type() === 'number') {
    <label for="">{{ label() }}</label>
    number: <input type="number" />
    }
  `,
  styleUrl: './form-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements ControlValueAccessor {
  type = input.required<FieldType>();
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  required = input<boolean>(false);

  // number
  max = input<number | undefined>(undefined);
  min = input<number | undefined>(undefined);
  step = input<number | undefined>(undefined);

  // select
  options = input<string[] | undefined>([]);

  protected value: any = null;
  protected disabled: boolean = false;

  protected ngControl = inject(NgControl, { optional: true });

  private onChange: (value: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string): void {
    if (this.disabled) {
      return;
    }
    this.value = value;
    this.onChange(value);
  }

  markAsTouched(): void {
    this.onTouched();
  }

  protected onValueChange(newValue: any): void {
    this.value = newValue;
    this.onChange(newValue);
  }

  protected onTouched(): void {
    this.onTouchedCallback();
  }
}