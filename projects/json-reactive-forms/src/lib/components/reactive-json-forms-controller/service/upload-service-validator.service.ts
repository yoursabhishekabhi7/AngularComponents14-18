import { ElementRef, Injectable, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactiveJsonFormsService implements OnInit {
  dynamicFormGroup: any = [];
  model = {};
  SHIPPING_BILL_LIST: any = [];
  BL_COPY_LIST: any = [];
  COMMERICAL_NO: any = [];
  ORM_BY_PARTY_NAME: any = [];
  ORM_SELECTION_DATA: any = [];
  BOE_LIST: any = [];
  CURRENCY_LIST: any = [];
  BUYER_DETAILS: any = [];
  BUYER_ADDRESS_DETAILS: any = [];
  BENEFICIARY_DETAILS: any = [];
  BENEFICIARY_ADDRESS_DETAILS: any = [];
  INWARD_REMITTANCE_NAME_LIST: any = [];
  NEW_INWARD_REMITTANCE_NAME_LIST: any = [];
  BUYER_REMITTANCE_NAME_LIST: any = [];
  ConsigneeNameList: any = [];
  PIPO_DATA: any = [];
  pipourl1: any = '';
  pipoArr: any = [];
  BUYER_LIST: any = [];
  CommercialNumber: any = [];
  COMMERCIAL_LIST: any = [];
  commerciallist: any = [];
  SHIPPING_BUNDEL: any = [];
  SHIPPING_BILL_MASTER_DATA: any = [];
  SUBMIT_ERROR: boolean = false;
  origin: any = [];
  commodity: any = [];
  location: any = [];
  bankDetail: any = [];
  bankDetail2: any = [];
  Id: any = '';
  BANK_NAME_LIST_GLOABL: any = [];
  FIELDS_DATA: any = [];
  LOGIN_TOEKN: any = '';
  userData: any = [];
  BUYER_NOT_EXITS: boolean = false;
  BENEFICIARY_NOT_EXITS: boolean = false;
  SELECTED_PIPO: any = [];
  SELECTED_PIPO_ID: any = [];
  ToChargesAccountdata: any = [];
  ToCreditAccountdata: any = [];
  BANK_LIST_DROPDOWN: any = [];
  ORIGANL_BANK_LIST_DROPDOWN: any = [];
  CommericalNo: ElementRef | any;
  BUYER_DETAILS_MASTER: any = [];
  BUYER_DETAILS_DROPDOWN_MASTER: any = [];
  COMPANY_INFO: any = [];
  CHECK_BOX_BANK_LIST: any = [];
  CHECK_BOX_BANK_LIST_CHARGES: any = [];
  CHECK_BOX_REMITTER_LIST: any = [];
  REMITTER_LIST: any = []
  PIPO_LIST: any = {
    "Import": [],
    "Export": [],
    "CI_EXPORT": [],
    "CI_IMPORT": []
  };
  ORM_LIST: any = {
    "Import": [],
    "Export": [],
    "CI_EXPORT": [],
    "CI_IMPORT": []
  };
  DAN_LIST: any = [];
  PAYMENTS_TEMRS: any = [];
  PURPOSE_CODE_FILTER_DATA: any = [];
  PURPOSE_CODE_LIST_DATA: any = [];
  A2_JSON_DATA: any = []
  sumTotalAmount: any = 0;
  SELECTED_PURPOSE_CODE_DATA: any = [];
  SELECTED_PURPOSE_CODE_INDEX: any = [];
  SELECTED_PURPOSE_CODE_DUMP_SLEECTION: any = [];
  UPLOAD_STATUS: boolean = false;
  USER_DATA: any = [];
  PIPO_TRANSCTION_LIST: any = [];
  DROP_DOWN_DATA: any = [];
  ALL_DATA_PURPOSE_CODE: any = '';
  SELECT_REPORT_TYPE: any = null;
  ARRAY_LIST_DROP_DOWN_DATA: any = [];
  HSCODE_FEILD_FORM: any = {
    id: "",
    form: "",
    fieldName: "",
    OptionfieldIndex: "",
    FormOptionfieldName: "",
    value: "",
    callback: "",
    field: "",
    NewId: ""
  }
  MT102_SUBJECT: any = ''
  ReferenceNumber = this.getReferenceNumber();
  FORM_VALUE_CHANGES: any = new BehaviorSubject([]);
  AFTER_BUILD_FORM: BehaviorSubject<any> = new BehaviorSubject([]);
  SUBMIT_FORM: BehaviorSubject<any> = new BehaviorSubject([]);
  BuyerSpecificConsigneeNameList: any = [];
  ArraySelectOption: any = [];

  constructor() {
    this.ReferenceNumber = this.getReferenceNumber();
  }

  ResignReferenceNumber() {
    this.ReferenceNumber = this.getReferenceNumber();
  }

  ngOnInit(): void {

  }

  getReferenceNumber() {
    return (Math.floor((Math.random() + Math.floor(Math.random() * 9) + 1) * Math.pow(10, 8)))?.toString();
  }

  toWords(s: any) {
    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1)
      x = s.length;
    if (x > 15)
      return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
      if ((x - i) % 3 == 2) {
        if (n[i] == '1') {
          str += tn[Number(n[i + 1])] + ' ';
          i++;
          sk = 1;
        } else if (n[i] != 0) {
          str += tw[n[i] - 2] + ' ';
          sk = 1;
        }
      } else if (n[i] != 0) { // 0235
        str += dg[n[i]] + ' ';
        if ((x - i) % 3 == 0) str += 'hundred ';
        sk = 1;
      }
      if ((x - i) % 3 == 1) {
        if (sk)
          str += th[(x - i - 1) / 3] + ' ';
        sk = 0;
      }
    }

    if (x != s.length) {
      var y = s.length;
      str += 'point ';
      for (let i = x + 1; i < y; i++)
        str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ')?.toUpperCase();
  }

  BENEFICIARY_DETAILS_LIST: any = [];
  filterData(data: any) {
    this.PURPOSE_CODE_FILTER_DATA = this.A2_JSON_DATA.filter((item: any) => item?.RBI_Purpose_Code.includes(data));
    if (this.PURPOSE_CODE_FILTER_DATA.length == 0 || data == '') {
      this.PURPOSE_CODE_FILTER_DATA = this.A2_JSON_DATA;
    }
  }

  text_array(text: any) {
    let split_text: any = text?.indexOf("\n") != -1 ? text?.split('\n') : [text];
    return split_text;
  }

  COMPANY_SELECTED_BANK_DETAILS: any = [];
  async buildForm(model: any, id: any) {
    console.log(model,"model")
    this.FORM_VALUE_CHANGES[id] = new BehaviorSubject([]);
    return new Promise(async (resolve, reject) => {
      const formGroupFields = await this.getFormControlsFields(model, id);
      this.dynamicFormGroup[id] = await new FormGroup(formGroupFields?.formGroupFields);
      this.FIELDS_DATA[id] = formGroupFields?.fields;
      console.log(this.dynamicFormGroup,formGroupFields,"dynamicFormGroup")
      await this.dynamicFormGroup;
      await resolve(this.dynamicFormGroup);
      this.dynamicFormGroup[id]?.valueChanges.pipe(debounceTime(200))?.subscribe((x: any) => {
        this.FORM_VALUE_CHANGES[id].next({ status: this.dynamicFormGroup[id]?.status, form: this.dynamicFormGroup[id], value: x, id: id })
      });
      this.AFTER_BUILD_FORM.next({ status: this.dynamicFormGroup[id]?.status, form: this.dynamicFormGroup[id], id: id })
      await this.FIELDS_DATA[id]?.forEach((element: any) => {
        if (element?.type === "yesnocheckbox") {
          element?.HideShowInput?.forEach((HideShowInputElement: any) => {
            const index = this.FIELDS_DATA[id]?.findIndex((val: any) => val?.fieldName?.includes(HideShowInputElement?.name));
            if (index != -1) {
              if (HideShowInputElement?.status == true) {
                this.FIELDS_DATA[id][index]['disabled'] = false;
                this.dynamicFormGroup[id]?.controls[HideShowInputElement?.name]?.enable();
              } else {
                this.FIELDS_DATA[id][index]['disabled'] = true;
                this.dynamicFormGroup[id]?.controls[HideShowInputElement?.name]?.disable();
              }
            }
          });
        }
        if (element?.type === "YesNoRadioButton") {
          element?.HideShowInput?.forEach((HideShowInputElement: any) => {
            const index = this.FIELDS_DATA[id]?.findIndex((val: any) => val?.fieldName?.includes(HideShowInputElement?.name));
            if (index != -1) {
              if (HideShowInputElement?.status == true) {
                this.FIELDS_DATA[id][index]['disabled'] = false;
                this.dynamicFormGroup[id]?.controls[HideShowInputElement?.name]?.enable();
              } else {
                this.FIELDS_DATA[id][index]['disabled'] = true;
                this.dynamicFormGroup[id]?.controls[HideShowInputElement?.name]?.disable();
              }
            }
          });
        }
      });
    })
  }

  setBankList(data: any) {
    this.BANK_NAME_LIST_GLOABL = [];
    setTimeout(() => {
      this.BANK_NAME_LIST_GLOABL = data;
    }, 200);
  }

  async getFormControlsFields(model: any, formid: any) {
    const formGroupFields: any = {};
    const fields: any = [];
    for (const field of Object.keys(model)) {
        const fieldProps = model[field];
        if (fieldProps?.type === "formArray") {
            const tempFormGroup = this.createFormArray(fieldProps, formid,field);
            formGroupFields[field] = await tempFormGroup.array;
            fieldProps['NewformGroup'] = tempFormGroup.fields;
            fieldProps['RemoveListIndex'] = [{ START_INDEX: -1, LAST_INDEX: -1 }];
            fields.push({ ...fieldProps, fieldName: field });
        } else if (fieldProps?.type === "formGroup" && fieldProps?.formArray) {
            const nestedGroupControls = this.createNestedFormGroups(fieldProps,formid,field);
            formGroupFields[field] = await new FormArray(nestedGroupControls);
            fields.push({ ...fieldProps, fieldName: field });
        } else {
            formGroupFields[field] = this.createFormControl(fieldProps,formid,field);
            fields.push({ ...fieldProps, fieldName: field });
        }
    }
    return { formGroupFields, fields };
}

// Helper Functions
private createFormArray(fieldProps: any, formid: any,field:any) {
    const tempFormGroup: FormGroup[] = [];
    const fields: any[] = [];
    for (const element of fieldProps.formGroup) {
        for (const field of Object.keys(element)) {
            const control:any = new FormControl({
                value: element[field]?.value || "",
                disabled: element[field]?.disabled !== undefined,
            }, this.setRequired(element[field]?.minLength, element[field]?.maxLength, element[field]?.rules, formid,field)[element[field]?.type || element[field]?.typeOf]);

            tempFormGroup.push(control);
            fields.push({ ...element[field], fieldName: field });
        }
    }

    return { array: new FormArray(tempFormGroup), fields };
}

private createNestedFormGroups(fieldProps: any, formid: any,field:any) {
    const tempFormGroup: FormGroup[] = [];
    for (const element of fieldProps.formArray) {
        const optionControls:any = {};
        for (const opt of element) {
            optionControls[opt.name] = this.createFormControl(opt, formid,field);
        }
        tempFormGroup.push(new FormGroup(optionControls));
    }
    return tempFormGroup;
}

private createFormControl(fieldProps: any, formid: any,field:any) {
    return new FormControl({
        value: fieldProps.value,
        disabled: fieldProps.disabled !== undefined,
    }, this.setRequired(fieldProps.minLength, fieldProps.maxLength, fieldProps.rules,formid,field)[fieldProps.type || fieldProps.typeOf]);
}

  ControlSetValue(id: any, key: any, value: any) {
    this.FIELDS_DATA[id]?.[key]?.setValue(value);
  }

  setValueFromArray(id: any, form: any, fieldName: any, OptionfieldIndex: any, FormOptionfieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    const myForm: any = form?.controls[fieldName] as FormGroup;
    let currentVal = value;
    myForm.value[OptionfieldIndex][FormOptionfieldName] = currentVal;
    myForm?.controls[OptionfieldIndex]?.controls[FormOptionfieldName]?.setValue(currentVal);
    myForm['touched'] = true;
    myForm['status'] = 'VALID';
    this.dynamicFormGroup[id].get(fieldName).clearValidators();
    this.dynamicFormGroup[id].get(fieldName).updateValueAndValidity();
    if (callback != undefined && callback != null) {
      callback({ id: id, form: form, fieldName: fieldName, OptionfieldIndex: OptionfieldIndex, FormOptionfieldName: FormOptionfieldName, value: value, dynamicFormGroup: this.dynamicFormGroup[id], field: this.FIELDS_DATA[id] });
    }
  }

  setValueFrom(id: any, form: any, fieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    const myForm: any = form?.controls[fieldName] as FormGroup;
    let currentVal = value;
    myForm?.setValue(currentVal);
    myForm['touched'] = true;
    myForm['status'] = 'VALID';
    this.dynamicFormGroup[id].get(fieldName).clearValidators();
    this.dynamicFormGroup[id].get(fieldName).updateValueAndValidity();
    if (callback != undefined && callback != null) {
      callback({ id: id, form: form, fieldName: fieldName, value: value, dynamicFormGroup: this.dynamicFormGroup[id], field: field });
    }
  }

  setValueFromChildArray(id: any, form: any, ParentfieldName: any, FormArrayfieldName: any, OptionfieldIndex: any,
    ChildOptionfieldName: any, ChildOptionfieldIndex: any, FormOptionfieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    const myForm: any = form?.controls[ParentfieldName] as FormGroup;
    let currentVal = value;
    myForm.value[OptionfieldIndex][FormOptionfieldName][ChildOptionfieldIndex][ChildOptionfieldName] = currentVal;
    myForm?.controls[OptionfieldIndex]?.controls[FormOptionfieldName]?.setValue(currentVal);
    myForm['touched'] = true;
    myForm['status'] = 'VALID';
    this.dynamicFormGroup[id].get(FormArrayfieldName).clearValidators();
    this.dynamicFormGroup[id].get(FormArrayfieldName).updateValueAndValidity();
    if (callback != undefined && callback != null) {
      callback({ id: id, form: form, fieldName: FormArrayfieldName, OptionfieldIndex: OptionfieldIndex, FormOptionfieldName: FormOptionfieldName, value: value, dynamicFormGroup: this.dynamicFormGroup[id], field: this.FIELDS_DATA[id] });
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl: any = formGroup.controls[matchingControlName];
      if (matchingControl?.errors && !matchingControl?.errors?.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  setRequired(minLength: number | undefined, maxLength: number | undefined, rule: any, formid: any, field: any): any {
    const baseValidators = [
        minLength !== undefined ? Validators.minLength(minLength) : Validators.minLength(0),
        maxLength !== undefined ? Validators.maxLength(maxLength) : Validators.maxLength(100)
    ];

    const requiredValidator = rule?.required ? [Validators.required] : [];
    const combinedValidators = (type: string) => {
        return [...requiredValidator, ...baseValidators, ...(field?.Validator || [])];
    };

    const validatorsMap = {
        text: combinedValidators('text'),
        textarea: combinedValidators('textarea'),
        date: combinedValidators('date'),
        datetime: combinedValidators('datetime'),
        time: combinedValidators('time'),
        Address: combinedValidators('Address'),
        number: combinedValidators('number'),
        Amount: combinedValidators('Amount'),
        OnlyNumber: combinedValidators('OnlyNumber'),
        TextValiadtion: [...combinedValidators('TextValiadtion'), hasAmountLessThanForm(field?.EqualName, field?.errormsg)],
        TextGreaterValiadtion: [...combinedValidators('TextGreaterValiadtion'), hasAmountGreaterThanForm(field?.EqualName, field?.errormsg)],
        buyer: requiredValidator,
        ArrayCheckbox: requiredValidator,
        CompanyBankList: requiredValidator,
        MultipleMatCheckBox: requiredValidator,
        YesNoRadioButton: requiredValidator,
        BuyerRemitter: requiredValidator,
        AddSignature: requiredValidator,
        AddressInfo: requiredValidator,
        AxisBankMultiCheckBox: requiredValidator,
        MultiCheckBoxSelectionOption: requiredValidator,
        Newbuyer: requiredValidator,
        ReUpload: requiredValidator,
        DropDown: requiredValidator,
        button: requiredValidator,
        checkbox: requiredValidator,
        ArraySelectOption: requiredValidator,
        PURPOSE_CODE: requiredValidator,
        CheckboxMultiple: requiredValidator,
        SelectOption: requiredValidator,
        BankAdd: requiredValidator,
        RemitterCheckBox: requiredValidator,
        ShippingBill: requiredValidator,
        BankCheckBox: requiredValidator,
        ImagesList: requiredValidator,
        consignee: requiredValidator,
        BuyerSpecificConsignee: requiredValidator,
        commodity: requiredValidator,
        commodityadd: requiredValidator,
        origin: requiredValidator,
        location: requiredValidator,
        PaymentType: requiredValidator,
        Bank: requiredValidator,
        BankList: requiredValidator,
        currency: requiredValidator,
        CommericalNo: requiredValidator,
        typedocument: requiredValidator,
        PaymentTermType: requiredValidator,
        undefined: requiredValidator,
        MatchedValue: requiredValidator,
        Underlying: requiredValidator,
        BuySell: requiredValidator,
        IncoTerm: requiredValidator,
        MultiCheckBox: requiredValidator,
        OptionMultiCheckBox: requiredValidator,
        RemitterName: requiredValidator,
        formGroup: requiredValidator,
        benne: requiredValidator,
        CommericalListCheckBox: requiredValidator,
        BLCopy: requiredValidator,
        yesnocheckbox: requiredValidator,
        ArrayList: requiredValidator,
        ArrayList_Object: requiredValidator,
        InputButton: combinedValidators('InputButton'),
        BOE: requiredValidator,
        ORM_SELECTION: requiredValidator,
        LABLE_CHECKBOX: requiredValidator,
        EmailButton: requiredValidator,
        NumberButton: requiredValidator,
        AdvanceInfo: [],
        NotRequired: [],
        CallbackButton: [],
        LabelShow: [],
        OnlyLabelShow: [],
        SB_DETAILS_SHOW: [],
        ALPHA_NUMERIC: [
            ...combinedValidators('ALPHA_NUMERIC'),
            alphaNumericValidator
        ],
        email: combinedValidators('email'),
        password: combinedValidators('password'),
        confirmPassword: [
            ...combinedValidators('confirmPassword'),
            hasDuplicateControl({ key: 'confirmPassword', equalkey: 'password' }, this.dynamicFormGroup, formid)
        ],
    };

    return validatorsMap;
}


  removeRequiredValidator(condition: boolean, id: any, fieldName: any) {
    const emailControl = this.dynamicFormGroup[id].get(fieldName);
    if (emailControl) {
      if (condition) {
        emailControl.setValidators([Validators.required]);
      } else {
        emailControl.clearValidators();
      }
      emailControl.updateValueAndValidity();
    }
  }

  valueChangesSpecficeName(id: any, fieldName: any) {
    return this.dynamicFormGroup[id].get(fieldName)?.valueChanges;
  }


  removeDuplicates(data: any, key: any) {
    let newArray: any = [];
    let uniqueObject: any = {};
    for (let i in data) {
      let objTitle = data[i][key];
      uniqueObject[objTitle] = data[i];
    }
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    return newArray;
  }

  max_length_validator(id: any, fieldName: any) {
    if ((this.dynamicFormGroup[id]?.controls[fieldName]?.value?.length > this.dynamicFormGroup[id]?.controls[fieldName]?.errors?.['maxlength']?.requiredLength)) {
      return false;
    }
    return true;
  }

  max_length_validatorFormArray(id: any, formGroupKey: any, index: any, fieldName: any) {
    if ((this.dynamicFormGroup[id]?.controls[formGroupKey]?.controls[index]?.controls[fieldName]?.value?.length > this.dynamicFormGroup[id]?.controls[formGroupKey]?.controls[index]?.controls[fieldName]?.errors?.['maxlength']?.requiredLength)) {
      return false;
    }
    return true;
  }

  counter = 0;
  buildNewFormArray(field: any, index: any, element: any, formid: any, GroupLabel: any, MAX_LIMIT: any): any {
    return new Promise(async (resolve, reject) => {
      this.counter = GroupLabel.length + 1;
      var temp: any = [];
      var tempFormGroup: any = [];
      let count: number = this.FIELDS_DATA[formid][index]['NewformGroup'].length;
      let count1: number = this.FIELDS_DATA[formid][index]['NewformGroup'].length;
      for (let field2 of Object.keys(element)) {
        temp.push({ ...element[field2], fieldName: field2, index: count });
        this.FIELDS_DATA[formid][index]['NewformGroup'].push({ ...element[field2], fieldName: field2, index: count });
        tempFormGroup.push(new FormGroup({
          [field2]: new FormControl({ value: element[field2]?.value || "", disabled: element[field2]?.disabled != undefined ? true : false },
            this.setRequired(element[field2]?.minLength, element[field2]?.maxLength, element[field2]?.rules, formid, field2)[element[field2]?.typeOf != undefined ? element[field2]?.typeOf : element[field2]?.type])
        }));
        count++;
      }
      await this.FIELDS_DATA[formid][index]['formGroup'].push({ ... this.FIELDS_DATA[formid][index]['formGroup'][0], fieldName: field });
      await this.FIELDS_DATA[formid][index]['RemoveListIndex'].push({ START_INDEX: count1, LAST_INDEX: count1 + MAX_LIMIT?.MAX_LIMIT });
      await GroupLabel.push(GroupLabel[0].replace('1', GroupLabel?.length + 1));
      await resolve(await tempFormGroup);
    });
  }

  async addNewFormArray(id: any, index: any, fieldName: any) {
    let optiontemp: any = {};
    let OptiontempFormGroup: any = {};
    let dumpformdata: any = this.FIELDS_DATA[id][index]?.NewformArray[this.FIELDS_DATA[id][index]?.NewformArray?.length - 1];
    for (const key in dumpformdata) {
      const fieldProps: any = dumpformdata[key];
      optiontemp[fieldProps?.name] = ({ ...fieldProps, fieldName: fieldProps?.name });
      OptiontempFormGroup[fieldProps?.name] = new FormControl({ value: "", disabled: fieldProps?.disabled != undefined ? true : false },
        this.setRequired(fieldProps?.minLength, fieldProps?.maxLength, fieldProps?.rules, id, fieldProps)[fieldProps?.typeOf != undefined ? fieldProps?.typeOf : fieldProps?.type])
    }
    this.dynamicFormGroup[id]?.controls[fieldName]?.controls?.push(new FormGroup(OptiontempFormGroup));
    this.dynamicFormGroup[id]?.controls[fieldName]?.value?.push(this.emptyvalue(this.dynamicFormGroup[id]?.controls[fieldName]?.value[this.dynamicFormGroup[id]?.controls[fieldName]?.value?.length - 1]));
    this.FIELDS_DATA[id][index]['NewformArray']?.push(optiontemp);
    this.FIELDS_DATA[id][index]['OrderKey']?.push(this.FIELDS_DATA[id][index]['OrderKey'][this.FIELDS_DATA[id][index]['OrderKey']?.length - 1]);
    await this.FIELDS_DATA[id][index]?.GroupLabel?.push(this.FIELDS_DATA[id][index]?.GroupLabel[0]?.replace('1', this.FIELDS_DATA[id][index]?.GroupLabel?.length + 1));
  }

  emptyvalue(data: any) {
    var temp: any = {};
    for (const key in data) {
      temp[key] = ''
    }
    return temp;
  }

  async removeNewFormArray(id: any, index: any, fieldName: any, OptionfieldIndex: any) {
    this.dynamicFormGroup[id]?.controls[fieldName]?.controls?.splice(OptionfieldIndex, 1);
    this.dynamicFormGroup[id]?.controls[fieldName]?.value?.splice(OptionfieldIndex, 1);
    this.FIELDS_DATA[id][index]['NewformArray']?.splice(OptionfieldIndex, 1);
    this.FIELDS_DATA[id][index]['NewformArray']?.forEach((element: any, index: any) => {
      this.FIELDS_DATA[id][index]?.GroupLabel?.push(this.FIELDS_DATA[id][index]?.GroupLabel[0]?.replace('1', (index + 1)));
    });
  }

  removeFormArray(formGroupKey: any, index: any, labelIndex: any, formid: any, MAX_LIMIT: any): any {
    return new Promise(async (resolve, reject) => {
      if (index != 0) {
        let indexstore: any = this.FIELDS_DATA[formid][index]['RemoveListIndex'][labelIndex];
        for (var i = indexstore?.LAST_INDEX; i-- > indexstore?.START_INDEX;) {
          this.dynamicFormGroup[formid]?.controls[formGroupKey]?.removeAt(i)
        }
        await this.FIELDS_DATA[formid][index]['formGroup']?.splice(labelIndex, 1);
        await this.FIELDS_DATA[formid][index]['GroupLabel']?.splice(labelIndex, 1)

        for (let i = indexstore?.LAST_INDEX - 1; i >= indexstore?.START_INDEX; i--) {
          this.FIELDS_DATA[formid][index]['NewformGroup']?.splice(i, 1);
        }

        for (let i = this.FIELDS_DATA[formid][index]['RemoveListIndex']?.length - 1; i >= labelIndex; i--) {
          this.FIELDS_DATA[formid][index]['RemoveListIndex']?.splice(i, 1);
        }

        if (indexstore?.START_INDEX != MAX_LIMIT?.MAX_LIMIT) {
          this.FIELDS_DATA[formid][index]['NewformGroup']?.forEach((element: any, index: any) => {
            element['index'] = index;
          });
          this.FIELDS_DATA[formid][index]['GroupLabel']?.forEach((element: any, i: any) => {
            let tempelement = this.FIELDS_DATA[formid][index]['GroupLabel'][0]?.replace('1', '');
            this.FIELDS_DATA[formid][index]['GroupLabel'][i] = tempelement + ' ' + (i + 1);
          });
          this.removeIndexUpdate(this.FIELDS_DATA[formid][index]['RemoveListIndex'], MAX_LIMIT?.MAX_LIMIT);
        }
      }
      await resolve('');
    });
  }

  removeIndexUpdate(data: any, MAX_LIMIT: any) {
    data?.forEach((element: any) => {
      for (const key in element) {
        if (element?.START_INDEX != MAX_LIMIT && element?.START_INDEX != -1) {
          element[key] = element[key] - MAX_LIMIT
        }
      }
    });
  }

  removeUpdateFormValue(data: any, MAX_LIMIT: any) {
    data?.forEach((element: any) => {
      for (const key in element) {
        if (element?.START_INDEX != MAX_LIMIT && element?.START_INDEX != -1) {
          element[key] = element[key] - MAX_LIMIT
        }
      }
    });
  }

  setInputVisibilty(formid: any, index: any, key: any, value: any) {
    this.FIELDS_DATA[formid][index][key] = value;
  }
}

export function hasDuplicateFormArray(data: any): ValidatorFn {
  return (formArray: FormArray | any): { [key: string]: any } | null | any => {
    if (formArray?.controls?.[data?.index]?.controls?.[data?.key]?.value != formArray?.controls?.[data?.equalindex]?.controls?.[data?.equalkey]?.value) {
      formArray?.controls?.[data?.equalindex]?.controls?.[data?.equalkey]?.setErrors({ matched: data?.errormsg })
      return null;
    } else {
      return null;
    }
  };
}

export function hasAmountLessThanFormArray(control: FormControl): ValidationErrors | null {
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
}

export function hasAmountLessThanForm(equals: string, Message: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const equalsField: any = control.root.get(equals)
    if (equalsField) {
      if (parseFloat(control.value) <= parseFloat(equalsField?.value)) {
        return null;
      } else {
        return { matched: Message };
      }
    }
    return null;
  }
}

export function hasAmountGreaterThanForm(equals: string, Message: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const equalsField: any = control.root.get(equals)
    if (equalsField) {
      if (parseFloat(control.value) >= parseFloat(equalsField?.value)) {
        return null;
      } else {
        return { matched: Message };
      }
    }
    return null;
  }
}

export function hasAmountGreaterThanFormArray(control: FormControl): ValidationErrors | null {
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
}

export function RemoveValidator(): ValidatorFn {
  return (formArray: FormArray | any): { [key: string]: any } | null | any => {
    return null
  };
}

export function hasDuplicateControl(data: any, forms: any, id: any): ValidationErrors {
  return (formArray: FormControl | any): { [key: string]: any } | null | any => {
    if (forms[id] != undefined) {
      if (forms[id]?.controls[data?.key] != undefined && forms[id]?.controls[data?.equalkey] != undefined) {
        if (forms[id]?.controls[data?.key]?.value != forms[id]?.controls[data?.equalkey]?.value) {
          return { matched: 'Password and Confirm Password must be match.' };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}


export function alphaNumericValidator(control: FormControl): ValidationErrors | null {
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
}

export function alphaValidator(control: FormControl): ValidationErrors | null {
  const ALPHA_REGEX = /^[a-zA-Z_]*$/;
  const ALPHA_VALIDATION_ERROR = { alphaError: 'only alphabets values are allowed' }
  return ALPHA_REGEX.test(control.value) ? null : ALPHA_VALIDATION_ERROR;
}

export function EmailValidator(control: FormControl): ValidationErrors | null {
  const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
  const EMAIL_VALIDATION_ERROR = { emailError: 'Please insert/enter a valid email address.' }
  return EMAIL_REGEX.test(control.value) ? null : EMAIL_VALIDATION_ERROR;
}

export function PasswordValidator(control: FormControl): ValidationErrors | null {
  const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
  const EMAIL_VALIDATION_ERROR = { emailError: 'Please insert/enter a valid email address.' }
  return EMAIL_REGEX.test(control.value) ? null : EMAIL_VALIDATION_ERROR;
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl: any = formGroup.controls[matchingControlName];
    if (matchingControl?.errors && !matchingControl?.errors?.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: 'Password and Confirm Password must be match.' });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

// PasswordStrengthValidator
export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {
  let value: string = control.value || '';
  if (!value) {
    return null
  }
  let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine Upper case characters,current value ${value}` };
  }
  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine lower case characters,current value ${value}` };
  }
  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine number characters,current value ${value}` };
  }
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine special character,current value ${value}` };
  }
  return null;
}