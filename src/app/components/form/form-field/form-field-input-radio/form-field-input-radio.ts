import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';

@Component({
  selector: 'app-form-field-input-radio',
  standalone: true,
  template: `
    <fieldset>
      <legend>{{ label() }}</legend>
      @for (option of options(); track option; let idx = $index) {
        <label class="radio-option" [for]="optionId(idx)">
          <input
            type="radio"
            [id]="optionId(idx)"
            [name]="groupName"
            [value]="option"
            [checked]="value === option"
            [required]="required() && idx === 0"
            [disabled]="disabled"
            (change)="onSelectionChange(option)"
            (blur)="markAsTouched()"
          />
          <span>{{ option }}</span>
        </label>
      }
    </fieldset>
  `,
  styleUrl: './form-field-input-radio.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormFieldInputRadio,
      multi: true,
    },
  ],
})
export class FormFieldInputRadio extends FormFieldBase<string | null> {
  private readonly fallbackName = `radio-${Math.random().toString(36).slice(2)}`;

  options = input<string[] | undefined>([]);

  get groupName(): string {
    return this.id() || this.fallbackName;
  }

  optionId(index: number): string {
    return `${this.groupName}-${index}`;
  }

  onSelectionChange(option: string): void {
    this.emitChange(option);
  }
}
