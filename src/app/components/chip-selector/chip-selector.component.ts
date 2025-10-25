import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChipOption {
  id: string | number;
  label: string;
  value: any;
}

@Component({
  selector: 'app-chip-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-3">
      @for (option of options(); track option.id) {
        <button
          type="button"
          (click)="onChipClick(option)"
          [class]="getChipClasses(option)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styleUrl: './chip-selector.component.scss',
})
export class ChipSelectorComponent {
  options = input.required<ChipOption[]>();
  selected = input<any>(null);
  multiple = input<boolean>(false);
  selectionChange = output<any>();

  private selectedValue = signal<any>(null);

  constructor() {
    effect(() => { // sync
      const selectedValue = this.selected();
      if (selectedValue !== null && selectedValue !== undefined) {
        this.selectedValue.set(selectedValue);
      } else {
        this.selectedValue.set(null);
      }
    });
  }

  onChipClick(option: ChipOption): void {
    const newValue = this.isSelected(option) ? null : option.value;
    this.selectedValue.set(newValue);
    this.selectionChange.emit(newValue);
  }

  isSelected(option: ChipOption): boolean {
    return this.selectedValue() === option.value;
  }

  getChipClasses(option: ChipOption): string {
    const baseClasses = 'px-3 py-2 rounded-full border-2 font-medium transition-colors duration-200 cursor-pointer text-xs';
    const isSelected = this.isSelected(option);

    if (isSelected) {
      return `${baseClasses} bg-primary-light text-primary border-primary`;
    } else {
      return `${baseClasses} bg-white text-black border-gray-300 hover:border-gray-400`;
    }
  }
}

