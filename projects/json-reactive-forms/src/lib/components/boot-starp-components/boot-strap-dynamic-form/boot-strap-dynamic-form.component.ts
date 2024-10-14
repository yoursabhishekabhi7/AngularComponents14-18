import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface FormField {
  label: string;
  type: 'text' | 'email' | 'number' | 'select';
  name: string | '';
  value: string | number;
  required: boolean;
  options?: string[];
}

@Component({
  selector: 'boot-strap-dynamic-form',
  templateUrl: './boot-strap-dynamic-form.component.html',
  styleUrls: ['./boot-strap-dynamic-form.component.scss']
})
export class BootStrapDynamicFormComponent implements OnInit, OnChanges {
  form: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
  @Input("formData") formData: FormField[] = [];
  @Output("event") event: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.createFormGroup(this.formData);
  }

  createFormGroup(formData: any[]): FormGroup {
    const group: any = {};
    formData.forEach(field => {
      const control = new FormControl(
        field.value || '',
        field.required ? Validators.required : null
      );
      group[field.name] = control;
    });
    return new FormGroup(group);
  }

  onSubmit() {
    console.log(this.form?.value);
    this.event.emit(this.form)
  }

}
