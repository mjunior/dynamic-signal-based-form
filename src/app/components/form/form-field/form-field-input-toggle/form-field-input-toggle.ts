import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';

@Component({
  selector: 'app-form-field-input-toggle',
  standalone: true,
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
    </label>
  `,
  styleUrl: './form-field-input-toggle.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldInputToggle,
      multi: true,
    },
  ],
})
export class FormFieldInputToggle extends FormFieldBase<boolean> {
  onToggleChange(event: Event): void {
    const { checked } = event.target as HTMLInputElement;
    this.emitChange(!!checked);
  }
}
