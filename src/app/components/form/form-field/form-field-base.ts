import { ChangeDetectorRef, Directive, inject, input, output } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export abstract class FormFieldBase<T> implements ControlValueAccessor {
  blur = output<FocusEvent>();
  protected cdr = inject(ChangeDetectorRef);
  protected readonly ngControl = inject(NgControl, { self: true });

  protected emitBlur(event: FocusEvent): void {
    this.markAsTouched();
    this.blur.emit(event);
  }

  
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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
    this
    this.onTouched();
  }
}
