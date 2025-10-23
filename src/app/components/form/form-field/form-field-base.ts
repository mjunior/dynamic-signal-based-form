import { ChangeDetectorRef, Directive, inject, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class FormFieldBase<T> implements ControlValueAccessor {
  protected cdr = inject(ChangeDetectorRef);

  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  required = input<boolean>(false);

  value: T | null = null;
  disabled = false;

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this.value = value ?? null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  protected emitChange(value: T | null): void {
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
