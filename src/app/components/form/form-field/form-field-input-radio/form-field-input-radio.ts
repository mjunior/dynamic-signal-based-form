import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldBase } from '../form-field-base';
import { FormFieldInputError } from '../form-field-input-error/form-field-input-error';

@Component({
  selector: 'app-form-field-input-radio',
  standalone: true,
  imports: [FormFieldInputError],
  template: `
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm font-medium text-gray-700">
        {{ label() }}
        @if(required()) {
          <span class="text-red-500">*</span>
        }
      </label>
      
      <div class="flex flex-wrap gap-3">
        @for (option of options(); track option; let idx = $index) {
          <label 
            [for]="optionId(idx)"
            [class]="getOptionClasses(option)"
          >
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
              class="hidden"
            />
            <span class="flex items-center gap-2">
              <span class="radio-indicator"></span>
              {{ option }}
            </span>
          </label>
        }
      </div>
      
      <app-form-field-input-error
        [touched]="ngControl.touched"
        [errors]="ngControl.errors"
      />
    </div>
  `,
  styleUrl: './form-field-input-radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldInputRadio extends FormFieldBase<string | null> {
  private readonly fallbackName = `radio-${Math.random()
    .toString(36)
    .slice(2)}`;

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

  getOptionClasses(option: string): string {
    const baseClasses = 'inline-flex items-center rounded-full border-2 cursor-pointer transition-colors duration-200 text-xs radio-container';
    const isSelected = this.value === option;
    
    if (isSelected) {
      return `${baseClasses} bg-primary-light text-primary border-primary font-medium`;
    }
    
    return `${baseClasses} bg-white text-black border-gray-300 hover:border-gray-400`;
  }
}
