import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: '',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBase implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  required = input<boolean>(false);

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onTextInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    if (this.disabled) {
      return;
    }
    this.value = value;
    this.onChange(value);
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
