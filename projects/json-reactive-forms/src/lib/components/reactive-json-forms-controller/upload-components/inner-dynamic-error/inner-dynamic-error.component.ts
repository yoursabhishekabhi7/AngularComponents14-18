import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'inner-dynamic-error',
  templateUrl: './inner-dynamic-error.component.html',
  styleUrls: ['./inner-dynamic-error.component.scss']
})
export class InnerDynamicErrorComponent implements OnInit {
  @Input() formName?: FormGroup | any;
  @Input() fieldName: any;
  @Input('SUBMIT_ERROR') SUBMIT_ERROR: boolean = false;
  @Input('ErrorMessage') ErrorMessage: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  get getMessage() {
    return this.ErrorMessage ?? this.fieldName + ` should contain ${this.formName?.controls[this.fieldName]?.errors?.['minlength']?.requiredLength} digits only`
  }

  get getNormalMessage() {
    return this.ErrorMessage ?? ` Please enter the details.`
  }

}
