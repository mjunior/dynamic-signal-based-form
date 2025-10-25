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
import { FormFieldInputNumber } from '../../../components/form/form-field/form-field-input-number/form-field-input-number';
import { FormFieldInputRadio } from '../../../components/form/form-field/form-field-input-radio/form-field-input-radio';
import { FormFieldInputToggle } from '../../../components/form/form-field/form-field-input-toggle/form-field-input-toggle';
import { RequestService } from '../../shared/services/requests.service';
import { catchError, of, retry } from 'rxjs';

@Component({
  selector: 'app-section-page-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldInputText,
    FormFieldInputNumber,
    FormFieldInputRadio,
    FormFieldInputToggle,
  ],
  template: `
    <form [formGroup]="form" [class]="formClass">
      @for (field of fields; track field.id) { @switch (field.type) { @case
      ('text') {
      <app-form-field-input-text
        [id]="field.id.toString()"
        [label]="field.label"
        [required]="field.required ?? false"
        [formControlName]="field.id.toString()"
        (blur)="onBlur($event)"
      />
      } @case ('number') {
      <app-form-field-input-number
        [id]="field.id.toString()"
        [label]="field.label"
        [required]="field.required ?? false"
        [formControlName]="field.id.toString()"
      />
      } @case ('toggle') {
      <app-form-field-input-toggle
        [id]="field.id.toString()"
        [label]="field.label"
        [required]="field.required ?? false"
        [formControlName]="field.id.toString()"
      />
      } @case ('radio') {
      <app-form-field-input-radio
        [id]="field.id.toString()"
        [label]="field.label"
        [required]="field.required ?? false"
        [formControlName]="field.id.toString()"
        [options]="field.options"
      />
      } @default {
      <p>Unsupported field type: {{ field.type }}</p>
      } } }
      <ng-content></ng-content>
    </form>
  `,
  styleUrl: './section-page-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPageForm {
  private fb = inject(FormBuilder);
  private requestService = inject(RequestService);

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

  onBlur(event: any) {
    const input = event.target as HTMLInputElement | null;
    if (!input) {
      return;
    }

    const name = input.name ?? input.id;
    const control = name ? this.form.get(name) : null;

    if (!control) {
      return;
    }

    const valueChanged = control.dirty; // true if a change happened
    const currentValue = control.value;

    this.requestService
      .updateQuestion('98765', name, { value: currentValue })
      .pipe(
        retry(1),
        catchError((err) => {
          console.log('erro continua', err);
          return of({error: true});
        }),
      )
      .subscribe((res) => {
        console.log('res', res);
      });
  }
}
