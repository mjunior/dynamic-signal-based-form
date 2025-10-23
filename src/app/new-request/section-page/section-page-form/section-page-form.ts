import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Field } from '../../../new-request/shared/new-request.types';
import { FormFieldInputText } from '../../../components/form/form-field/form-field-input-text/form-field-input-text';

@Component({
  selector: 'app-section-page-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldInputText],
  template: `
    <form [formGroup]="form" [class]="formClass">
      @for (field of fields; track field.id) {
        @switch (field.type) {
          @case ('text') {
            <app-form-field-input-text
              [id]="field.id.toString()"
              [label]="field.label"
              [required]="field.required ?? false"
              [formControlName]="field.id.toString()"
            />
          } @case ('number') {
            <app-form-field-input-text
              [id]="field.id.toString()"
              [label]="field.label"
              [required]="field.required ?? false"
              [formControlName]="field.id.toString()"
            />
          } @default {
            <p>Unsupported field type: {{ field.type }}</p>
          }
        }
      }

      <ng-content></ng-content>
    </form>
  `,
  styleUrl: './section-page-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPageForm {
  private fb = inject(FormBuilder);

  private _fields: Field[] = [];

  @Input()
  set fields(value: Field[]) {
    if (value === this._fields) {
      return;
    }
    this._fields = value ?? [];
    this.rebuildForm();
  }
  get fields(): Field[] {
    return this._fields;
  }

  @Input()
  formClass = '';

  @Output()
  formCreated = new EventEmitter<FormGroup>();

  form: FormGroup = this.fb.group({});

  private rebuildForm(): void {
    const controls: Record<string, any> = {};
    for (const field of this.fields) {
      const controlName = field.id.toString();
      const validators = field.required ? [Validators.required] : [];
      const previousControl = this.form.get(controlName);
      const defaultValue =
        previousControl?.value ??
        field.default ??
        (field.type === 'number' ? null : '');
      controls[controlName] = this.fb.control(defaultValue, validators);
    }
    this.form = this.fb.group(controls);
    this.formCreated.emit(this.form);
  }
}
