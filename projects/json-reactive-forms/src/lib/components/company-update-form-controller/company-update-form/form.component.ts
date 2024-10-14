import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompanyUpdateFormControllerService } from './form.service';
import $ from 'jquery';
import { ReactiveJsonFormsService } from '../../reactive-json-forms-controller/service/upload-service-validator.service';

@Component({
  selector: 'company-update-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormControllerComponent implements OnInit, OnChanges {
  stepForm!: FormGroup;
  activeStep$!: number;
  @Output("onSubmit") onSubmit: EventEmitter<any> = new EventEmitter();
  @Output("onSubmitArray") onSubmitArray: EventEmitter<any> = new EventEmitter();
  @Output("onSubmitFull") onSubmitFull: EventEmitter<any> = new EventEmitter();
  @Output("NextEvent") NextEvent: EventEmitter<any> = new EventEmitter();
  @Output("BackEvent") BackEvent: EventEmitter<any> = new EventEmitter();
  @Output("ref") ref: EventEmitter<any> = new EventEmitter();
  @Input("id") id: string = "demo"
  @Input("ButtonName") ButtonName: string = "Submit"
  @Input("item") item?: {
    FORM_CREATE_LIST: Array<any>; 
    FORM_LIST: any;
    StepItem: {
      step: number; description: string;
    }[];
    TitleDescription: {
      Title: string; description: string;
    }[];
  };

  STORE_MULTI_FORM_VALUE: any = {}
  @ViewChild("bootstraptoasts") bootstraptoasts:any;
  constructor(public formService: CompanyUpdateFormControllerService,
    public validator: ReactiveJsonFormsService) { }

  ngOnInit(): void {
    this.ref.emit(this)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        if (change.currentValue !== undefined) {
          (this as any)[propName] = change.currentValue;
        }
      }
    }
    this.stepForm = this.formService.stepForm;
    this.formService.FORM_CREATE_LIST = this.item?.FORM_CREATE_LIST;
    this.formService.FORM_CREATE_BOOLEAN = false;
    if (Object.keys(this.item?.FORM_LIST)?.length != 0) {
      this.formService.multiStepFormList = [];
      this.formService.FORM_CREATE_LIST?.forEach(async (element:any, index:any) => {
        const form_create: any = await this.validator.buildForm({ ...this.item?.FORM_LIST[element] }, element);
        this.formService.multiStepFormList?.push(form_create[element])
        if (this.formService.multiStepFormList?.length == this.formService.FORM_CREATE_LIST?.length) {
          this.formService.FORM_CREATE_BOOLEAN = true;
        }
      });
    }
  }

  confirmAndSubmitForm(value:any) {
    let temp_value: any = [];
    this.formService.multiStepFormList?.forEach(element => {
      temp_value?.push(element?.getRawValue())
    });
    this.NextEvent.emit({ value: temp_value[temp_value?.length - 1], status: value?.value?.status, index: value?.index });
    const isEmpty = !Object.values(this.formService.multiStepFormList[this.formService.multiStepFormList?.length - 1]).some(x => x !== null && x !== '');
    if (isEmpty == false && value?.index == temp_value?.length) {
      this.onSubmitFull.emit({ status: "VALID", value: temp_value[temp_value?.length - 1] })
      this.onSubmit.emit(temp_value[temp_value?.length - 1])
    }
  }

  get getmultiStepFormList() {
    return this.formService.multiStepFormList
  }

  getStatus(item: any, i: any) {
    const bool = this.validator?.dynamicFormGroup[item]?.status != 'INVALID' && this.formService.TitleDescription[i]?.condition;
    return !bool
  }

  get ResetForm() {
    if (this.formService.multiStepFormList != undefined) {
      this.formService.multiStepFormList.forEach(element => {
        element?.reset()
      });
      this.formService.activeStepSubject.next(1)
    }
    return true;
  }

  getFormData() {
    this.getAllFormErrors()
    let allFormValues: any = {};
    let status = "VALID";  // Default to VALID
    this.formService.multiStepFormList.forEach((formGroup: any, index: number) => {
      $('.submit-button#' + this.formService.FORM_CREATE_LIST[index]).click();
      allFormValues = { ...allFormValues, ...formGroup?.value }
      // Check if the formGroup status is INVALID
      if (formGroup?.status === "INVALID") {
        status = "INVALID";  // Mark status as INVALID if any formGroup is invalid
      }
    });
    this.onSubmit.emit({ value: allFormValues, status: status })
    console.log(this.formService.multiStepFormList, allFormValues, status, "this.formService.multiStepFormList")
  }

  ERROR_STATUS: boolean = false;
  allErrors: Array<any> = [];  // Object to hold errors
  getAllFormErrors() {
    this.allErrors = []
    this.ERROR_STATUS = false;
    // Custom messages for form validation errors
    const errorMessages: any = {
      required: (error: any, fieldName: string) => `This ${fieldName} field is required.`,
      minlength: (error: any, fieldName: string) => `This ${fieldName} field is Minimum length is ${error.requiredLength} characters. You entered ${error.actualLength} characters.`,
      maxlength: (error: any, fieldName: string) => `This ${fieldName} field is Maximum length is ${error.requiredLength} characters. You entered ${error.actualLength} characters.`,
      email: (error: any, fieldName: string) => `This ${fieldName} Please enter a valid email address.`,
      pattern: (error: any, fieldName: string) => `This ${fieldName} Invalid format.`
    };
    this.formService.multiStepFormList.forEach((formGroup: any, index: number) => {
      Object.keys(formGroup.controls).forEach((controlName: string) => {
        const control = formGroup.get(controlName);  // Get the form control
        if (control && control.errors) {
          Object.keys(control.errors).forEach((errorKey: string) => {
            const error = control.errors[errorKey];
            if (errorMessages[errorKey]) {
              if (typeof errorMessages[errorKey] === 'function') {
                this.allErrors.push(errorMessages[errorKey](error, controlName));
              } else {
                this.allErrors.push(errorMessages[errorKey]);
              }
            } else {
              this.allErrors.push(`Error: ${errorKey}`);
            }
          });
        }
      });
    });
    if (this.allErrors.length != 0) {
      this.ERROR_STATUS = true
      this.bootstraptoasts?.OpenModel;
    } else {
      this.ERROR_STATUS = false
    }
    return this.allErrors;  // Return the collected errors
  }

}


