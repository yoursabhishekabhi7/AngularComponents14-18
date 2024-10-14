import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { ReactiveJsonFormsService } from '../service/upload-service-validator.service';
import $ from 'jquery';

@Component({
  selector: 'upload-components',
  templateUrl: './upload-components.component.html',
  styleUrls: ['./upload-components.component.scss'],
})
export class UploadComponentsComponent implements OnInit, AfterViewInit, OnDestroy {
  SUBMIT_ERROR: boolean = false;
  @Input('label') label: any = '';
  @Input('labelStyle') labelStyle: any = '';
  @Input('FormStyle') FormStyle: any = '';
  @Input('MainStyle') MainStyle: any = '';
  @Input('DetailsShow') DetailsShow: boolean = true;
  @Input('id') id: any = '';
  @Input('SubmitButtonStyle') SubmitButtonStyle: any = '';
  @Input('ButtonPanelStyle') ButtonPanelStyle: any = '';
  @Input('CancelRoute') CancelRoute: any = '';
  @Input('TypeOfValue') TypeOfValue: any = 'Normal';
  @Input('SubmitName') SubmitName: any = 'Submit';
  @Input('AddNewRequried') AddNewRequried: boolean = false;
  @Output('SubmitEvent') SubmitEvent: any = new EventEmitter();
  @Output('AddNewBank') AddNewBank: any = new EventEmitter();
  @Output('RawValueEvent') RawValue: any = new EventEmitter();
  @Output('BankEvent') BankEvent: any = new EventEmitter();
  @Output('SelectionBank') SelectionBank: any = new EventEmitter();
  @Output('YesNoCheckBoxEvent') YesNoCheckBoxEvent: any = new EventEmitter();
  @Output('SHIPPING_BILL_EVENT') SHIPPING_BILL_EVENT: any = new EventEmitter();
  @Output('CommericalNoEvent') CommericalNoEvent: any = new EventEmitter();
  @Output('AddButton') AddButton: any = new EventEmitter();
  @Output('BL_COPY_EVENT') BL_COPY_EVENT: any = new EventEmitter();
  @Output('BENEFICIARY_EVENT') BENEFICIARY_EVENT: any = new EventEmitter();
  @Output('BUYER_BENEE_EVENT') BUYER_BENEE_EVENT: any = new EventEmitter();
  @Output('PIPO_EVENT') PIPO_EVENT: any = new EventEmitter();
  @Input('HIDE_BACKGROUND') HIDE_BACKGROUND: boolean = true;
  @Input('HIDE_SUBMIT_BUTTON') HIDE_SUBMIT_BUTTON: boolean = true;
  @Input('KEY_ENTER_ENABLED') KEY_ENTER_ENABLED: any = false;
  @Input('ADD_NEW_BUTTON_VISIBLE') ADD_NEW_BUTTON_VISIBLE: boolean = false;
  @ViewChild('BuyerNotFoundPanel') BuyerNotFound: ElementRef | any;
  @ViewChild('BeneficiaryNotFoundPanel') BeneficiaryNotFound: ElementRef | any
  @Input('morecontent') morecontent: boolean = false;
  @Input('BUTTON_PANEL_SHOW') BUTTON_PANEL_SHOW: boolean = false;
  @Input('BUTTON_PANEL_HIDE') BUTTON_PANEL_HIDE: boolean = true;
  @Input('SubmitButtonDisabled') SubmitButtonDisabled: boolean = false;
  @Input('ResetForm') ResetForm: boolean = true;
  @Output('DropDownEvent') DropDownEvent: any = new EventEmitter();
  @Output('ArrayList_ObjectEvent') ArrayList_ObjectEvent: any = new EventEmitter();
  @Output('FormValueChanges') FormValueChanges: any = new EventEmitter();
  @Output('CancelEvent') CancelEvent: any = new EventEmitter();
  @Input('ErrorMessageData') ErrorMessageData!: { status: boolean, text: string };

  Account_Type: any = [{
    type: 'OD-over draft'
  }, {
    type: 'CC-cash credit'
  }, {
    type: 'CA-Current account'
  }, {
    type: 'EEFC - Exchange earner Foreign currency'
  }, {
    type: 'PCFC- packing credit Foreign currency'
  }, {
    type: 'EBRD- Bill discounting account'
  }];
  LOGIN_TOEKN: any = '';
  POPUP_VISIBLILTY: any = {
    BuyerNotFound: '',
    BeneficiaryNotFound: ''
  }
  HS_CODE_DATA: any = [];
  NEW_STATIC_PURPOSE_CODE_LIST: any = [];
  NEW_PURPOSE_CODE_LIST: any = [];
  PAGINATE_DATA: any = [];
  PAGINATOR_DATA: any = [];
  PURPOSE_CODE_DROPDOWN_DATA: Array<any> = [];
  PURPOSE_GROUP_NAME_DROPDOWN_DATA: Array<any> = [];
  constructor(public sanitizer: DomSanitizer,public router: Router,public validator: ReactiveJsonFormsService) { }
  ngOnInit() {}

  paginate(items:any, page = 1, perPage = 10) {
    const offset = perPage * (page - 1);
    const totalPages = Math.ceil(items.length / perPage);
    const paginatedItems = items.slice(offset, perPage * page);
    return {
      previousPage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      items: paginatedItems
    };
  };

  PAGINATION_EVENT(event: any) {
    let START_INDEX: number = (10 * event?.pageIndex);
    let END_INDEX: number = START_INDEX + 10;
    this.FILTER_HS_CODE_DATA = []
    for (let index = START_INDEX; index < END_INDEX; index++) {
      this.FILTER_HS_CODE_DATA.push(this.HS_CODE_DATA[index])
    }
  }

  get onClickButton() {
    $('.submit-button#' + this.id).click()
    return "";
  }

  get resetForm() {
    this.validator.FIELDS_DATA[this.id]?.forEach((element:any) => {
      element['value'] = '';
      this.validator.dynamicFormGroup[this.id]?.controls[element?.fieldName]?.setValue("");
    });
    return this.validator.dynamicFormGroup[this.id]?.reset();
  }

  onSubmit(event: any, e: any, type: any='') {
    console.log(e,"sfsdfdfsdfsdfd")
    event.preventDefault();
    if (e?.status == 'VALID') {
      if (this.TypeOfValue == "Normal") {
        this.SubmitEvent.emit(e);
      } else {
        this.SubmitEvent.emit(this.getRawValue);
      }
      this.SUBMIT_ERROR = false;
      this.RawValue.emit(this.getRawValue);
    } else {
      this.RawValue.emit(false);
      this.SUBMIT_ERROR = true;
    }
  }

  get getRawValue() {
    return this.validator.dynamicFormGroup[this.id]?.getRawValue()
  }

  dumpFunc(value: any, callback: any) {
    if (callback != undefined) {
      callback(value)
    }
  }

  get geForm() {
    return this.validator.dynamicFormGroup[this.id];
  }

  setFormValue(value: any, index: any, name1: any, name2: any) {
    if (typeof value == "object") {
      let sumofstring = ""
      for (const key in value) {
        const element = value[key];
        sumofstring += element + ','
      }
      this.validator.dynamicFormGroup[this.id]?.controls[name1]?.controls[index]?.controls[name2]?.setValue(sumofstring)
    } else {
      this.validator.dynamicFormGroup[this.id]?.controls[name1]?.controls[index]?.controls[name2]?.setValue(value)
    }
  }

  setValue(value: any, name1: any) {
    if (name1 != null && name1 != undefined && name1 != '') {
      this.validator.dynamicFormGroup[this.id]?.controls[name1]?.setValue(value)
      this.validator.dynamicFormGroup[this.id].value[name1] = (value)
      this.validator.dynamicFormGroup[this.id].controls[name1]['touched'] = true;
    }
  }

  addFormArray(key1: any, index: any, data: any, GroupLabel: any) {
    this.validator.buildNewFormArray(key1, index, data['formGroup'][0], this.id, GroupLabel, data).then((res: any) => {
      res?.forEach((element:any) => {
        this.validator.dynamicFormGroup[this.id]?.controls[key1].push(element)
      });
    })
  }

  removeFormArray(key1: any, index: any, labelIndex: any, data: any,data2:any={}) {
    this.validator.removeFormArray(key1, index, labelIndex, this.id, data).then((res: any) => { })
  }

  AUTOFILL_INPUT_NAME_LIST: any = [];
  ORM_SELECTION(event: any, index: any, data: any, AUTOFILL_INPUT_NAME_LIST: any, type: any = 'Normal') {
    if (event.target.checked) {
      this.validator.ORM_SELECTION_DATA.push(data);
      if (type == "Normal") {
        AUTOFILL_INPUT_NAME_LIST.forEach((element:any) => {
          this.validator.dynamicFormGroup[this.id]?.controls[element?.input]?.setValue(this.validator.ORM_SELECTION_DATA[element?.key]);
        });
        if (this.CALLBACK != undefined && this.CALLBACK != null && this.CALLBACK != '') {
          this.CALLBACK({ form: this.validator.dynamicFormGroup[this.id], AUTOFILL_INPUT_NAME_LIST: AUTOFILL_INPUT_NAME_LIST, FIELDS_DATA: this.field })
        }
      } else if (type == "formGroup") {
        AUTOFILL_INPUT_NAME_LIST.forEach((element:any) => {
          this.validator.dynamicFormGroup[this.id]?.controls[element?.parent]?.controls[0]?.controls[element?.input]?.setValue(this.validator.ORM_SELECTION_DATA[element?.key]);
        });
      }
      if (this.CALLBACK != undefined && this.CALLBACK != null && this.CALLBACK != '') {
        this.CALLBACK({ form: this.validator.dynamicFormGroup[this.id], AUTOFILL_INPUT_NAME_LIST: AUTOFILL_INPUT_NAME_LIST, FIELDS_DATA: this.field })
      }
    } else {
      this.validator.ORM_SELECTION_DATA.splice(index, 1)
      event.target.checked = false;
    }
  }

  CALLBACK: any = null;
  field: any = null;
  dump(data: any, callback: any = null, field: any = null) {
    this.AUTOFILL_INPUT_NAME_LIST = data;
    this.CALLBACK = callback;
    this.field = field;
  }

  autofillCommerical(Commericaldata: any, AUTOFILL_INPUT_NAME_LIST: any) {
    AUTOFILL_INPUT_NAME_LIST.forEach((element:any) => {
      this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.controls[element?.index]?.controls[element?.input]?.setValue(Commericaldata?.data[element?.key])
    });
  }

  CreateFormBank() {
    setTimeout(() => {
      this.validator.buildForm({
        BankName: {
          type: "text",
          value: "",
          label: "Bank Name",
          placeholderText: 'Bank Name',
          rules: {
            required: true,
          },
          maxLength: 200
        },
      }, 'AddNewBankName');
    }, 200);
  }

  addNewBank(e: any, panel: any) {
   
  }

  onAddNewBank() {
    this.AddNewBank.emit(true);
  }

  initialName(words:any) {
    'use strict'
    return words
      .replace(/\b(\w)\w+/g, '$1_')
      .replace(/\s/g, '')
      .replace(/\.$/, '')
      .toUpperCase();
  }

  removeAllSpecialChar(string: any) {
    return string?.replace(/[^a-zA-Z ]/g, "");
  }

  ngAfterViewInit() {
  
  }

  callbackFunction(value: any, callback: any = undefined) {
    if (callback != undefined) {
      callback(value)
    }
  }

  toggleRequiredValidator(condition: boolean, id:any) {
    const emailControl = this.validator.dynamicFormGroup[this.validator.HSCODE_FEILD_FORM?.id].get(this.validator.HSCODE_FEILD_FORM?.fieldName).get('email');
    if (emailControl) {
      if (condition) {
        emailControl.setValidators([Validators.required]);
      } else {
        emailControl.clearValidators();
      }
      emailControl.updateValueAndValidity();
    }
  }


  ValueAdd(id: any, form: any, fieldName: any, OptionfieldIndex: any, FormOptionfieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    this.validator.HSCODE_FEILD_FORM["id"] = id;
    this.validator.HSCODE_FEILD_FORM["form"] = form;
    this.validator.HSCODE_FEILD_FORM["fieldName"] = fieldName;
    this.validator.HSCODE_FEILD_FORM["OptionfieldIndex"] = OptionfieldIndex;
    this.validator.HSCODE_FEILD_FORM["FormOptionfieldName"] = FormOptionfieldName;
    this.validator.HSCODE_FEILD_FORM["callback"] = callback;
    this.validator.HSCODE_FEILD_FORM["field"] = field;
    this.validator.HSCODE_FEILD_FORM["value"] = value;
    this.validator.HSCODE_FEILD_FORM["NewId"] = FormOptionfieldName + '_' + OptionfieldIndex;
    if (this.validator.HSCODE_FEILD_FORM?.FormOptionfieldName != undefined && this.validator.HSCODE_FEILD_FORM?.FormOptionfieldName != null) {
      this.ALL_DATA_HSCODE[this.validator.HSCODE_FEILD_FORM?.NewId] = [];
    } else {
      this.ALL_DATA_HSCODE[fieldName] = []
    }
  }

  ToHSCode_Selected: any = [];
  ToHSCode(event: any, value: any, index: any) {
    if (this.validator.HSCODE_FEILD_FORM?.FormOptionfieldName != undefined && this.validator.HSCODE_FEILD_FORM?.FormOptionfieldName != null) {
      if (this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM?.NewId] == undefined) {
        this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM?.NewId] = []
      }
      if (event?.target?.checked == true) {
        this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM?.NewId][index] = value;
      } else {
        this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM?.NewId][index] = '';
      }
    } else {
      if (this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM.fieldName] == undefined) {
        this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM.fieldName] = []
      }
      if (event?.target?.checked == true) {
        this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM.fieldName][index] = value;
      } else {
        this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM.fieldName][index] = '';
      }
    }
  }

  ALL_DATA_HSCODE: any = {};
  DoneButton() {
    let temp2: any = [];
    let NEW_HS_CODE: any = [];
    if (this.validator.HSCODE_FEILD_FORM?.FormOptionfieldName != undefined && this.validator.HSCODE_FEILD_FORM?.FormOptionfieldName != null) {
      this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM?.NewId]?.forEach((element:any) => {
        temp2.push(element?.hscode);
        NEW_HS_CODE.push(element)
      });
      this.ALL_DATA_HSCODE[this.validator.HSCODE_FEILD_FORM?.NewId] = temp2.join(',');
      const myForm: any = this.validator.HSCODE_FEILD_FORM?.form?.controls[this.validator.HSCODE_FEILD_FORM.fieldName] as FormGroup;
      let currentVal = this.ALL_DATA_HSCODE[this.validator.HSCODE_FEILD_FORM?.NewId];
      myForm.value[this.validator.HSCODE_FEILD_FORM?.OptionfieldIndex][this.validator.HSCODE_FEILD_FORM.FormOptionfieldName] = currentVal;
      myForm?.controls[this.validator.HSCODE_FEILD_FORM?.OptionfieldIndex]?.controls[this.validator.HSCODE_FEILD_FORM.FormOptionfieldName]?.setValue(currentVal);
      myForm['touched'] = true;
      myForm['status'] = 'VALID';
      this.validator.dynamicFormGroup[this.validator.HSCODE_FEILD_FORM?.id].get(this.validator.HSCODE_FEILD_FORM?.fieldName).clearValidators();
      this.validator.dynamicFormGroup[this.validator.HSCODE_FEILD_FORM?.id].get(this.validator.HSCODE_FEILD_FORM?.fieldName).updateValueAndValidity();
      if (this.validator.HSCODE_FEILD_FORM?.callback != undefined && this.validator.HSCODE_FEILD_FORM?.callback != null) {
        this.validator.HSCODE_FEILD_FORM.callback({
          id: this.validator.HSCODE_FEILD_FORM.id,
          form: this.validator.HSCODE_FEILD_FORM.form, fieldName: this.validator.HSCODE_FEILD_FORM.fieldName,
          OptionfieldIndex: this.validator.HSCODE_FEILD_FORM.OptionfieldIndex,
          FormOptionfieldName: this.validator.HSCODE_FEILD_FORM.FormOptionfieldName,
          value: this.validator.HSCODE_FEILD_FORM.value,
          dynamicFormGroup: this.validator.dynamicFormGroup[this.validator.HSCODE_FEILD_FORM.id],
          field: this.validator.FIELDS_DATA[this.validator.HSCODE_FEILD_FORM.id],
          SELECTED_ITEMS: NEW_HS_CODE
        });
      }
    } else {
      this.ToHSCode_Selected[this.validator.HSCODE_FEILD_FORM.fieldName]?.forEach((element:any) => {
        temp2.push(element?.hscode);
        NEW_HS_CODE.push(element)
      });
      this.ALL_DATA_HSCODE[this.validator.HSCODE_FEILD_FORM.fieldName] = temp2.join(',');
      const myForm: any = this.validator.HSCODE_FEILD_FORM?.form;
      let currentVal = this.ALL_DATA_HSCODE[this.validator.HSCODE_FEILD_FORM.fieldName];
      myForm.value[this.validator.HSCODE_FEILD_FORM.fieldName] = currentVal;
      myForm?.controls[this.validator.HSCODE_FEILD_FORM.fieldName]?.setValue(currentVal);
      myForm['touched'] = true;
      myForm['status'] = 'VALID';
      if (this.validator.HSCODE_FEILD_FORM?.callback != undefined && this.validator.HSCODE_FEILD_FORM?.callback != null) {
        this.validator.HSCODE_FEILD_FORM.callback({
          id: this.validator.HSCODE_FEILD_FORM.id, form: this.validator.HSCODE_FEILD_FORM.form,
          fieldName: this.validator.HSCODE_FEILD_FORM.fieldName, OptionfieldIndex: this.validator.HSCODE_FEILD_FORM.OptionfieldIndex,
          FormOptionfieldName: this.validator.HSCODE_FEILD_FORM.FormOptionfieldName, value: this.validator.HSCODE_FEILD_FORM.value,
          dynamicFormGroup: this.validator.dynamicFormGroup[this.validator.HSCODE_FEILD_FORM.id],
          field: this.validator.FIELDS_DATA[this.validator.HSCODE_FEILD_FORM.id],
          SELECTED_ITEMS: NEW_HS_CODE
        });
      }
    }
  }

  filtertimeout: any = ''
  FILTER_HS_CODE_DATA: any = [];
  filterHSCode(value: any) {
    clearTimeout(this.filtertimeout);
    this.filtertimeout = setTimeout(() => {
      this.FILTER_HS_CODE_DATA = this.HS_CODE_DATA.filter((item: any) => item?.hscode?.indexOf(value) != -1 || item?.description?.toLowerCase()?.indexOf(value?.toLowerCase()) != -1);
      if (this.FILTER_HS_CODE_DATA.length == 0) {
        this.FILTER_HS_CODE_DATA = this.PAGINATE_DATA?.items;
      }
    }, 200);
  }

  PUPOSE_CODE_FEILD_FORM: any = {
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

  SELECT_PURPOSE_CODE(event: any, index: any) {

    this.validator.SELECTED_PURPOSE_CODE_DUMP_SLEECTION[index] = { PurposeCode: event?.toString(), Description: this.validator.PURPOSE_CODE_FILTER_DATA[index]?.Value_greater_25000_equv[0] };
    this.validator.SELECTED_PURPOSE_CODE_INDEX[index] = true;
    this.validator.PURPOSE_CODE_FILTER_DATA?.forEach((element:any, i:any) => {
      if (index == i) {
        element['isActive'] = true;
      }
    });
  }

  PURPOSE_ValueAdd(id: any, field: any) {
    this.PUPOSE_CODE_FEILD_FORM['id'] = id;
    this.PUPOSE_CODE_FEILD_FORM['field'] = field;
  }

  PURPOSEDoneButton() {
    let temp2: any = [];
    this.NEW_PURPOSE_CODE_LIST?.forEach((element:any) => {
      element[element?.keyName]?.forEach((keyNameelement:any) => {
        if (keyNameelement?.checked == true) {
          temp2.push(keyNameelement?.text);
        }
      });
    });
    this.validator.ALL_DATA_PURPOSE_CODE = temp2.join(',');
    this.setValue(this.validator.ALL_DATA_PURPOSE_CODE, this.PUPOSE_CODE_FEILD_FORM?.field);
  }

  IMAGE_UPLOAD_LIST: any = [];
  onUploadChanges(event: any, autofill: any) {
    if (event.target.files.length > 0) {
      event.target.files.forEach((element:any) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.IMAGE_UPLOAD_LIST.push({
            name: element?.name,
            buffer: fileReader.result
          })
        }
        fileReader.readAsDataURL(element);
      });
      this.validator.dynamicFormGroup[this.id]?.controls[autofill?.key]?.setValue(this.IMAGE_UPLOAD_LIST);
    }
  }

  removeImage(index: any, autofill: any) {
    this.IMAGE_UPLOAD_LIST.splice(index, 1);
    this.validator.dynamicFormGroup[this.id]?.controls[autofill?.key]?.setValue(this.IMAGE_UPLOAD_LIST);
  }

  HideShowInput(event: any, item: any, fieldIndex: any = -1, callback: any = undefined) {
    if (item != undefined) {
      if (item[event] != undefined) {
        item[event]?.forEach((element:any) => {
          const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(element));
          if (index != -1 && item[event] != undefined) {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
            this.validator.dynamicFormGroup[this.id]?.controls[element]?.disable();
          } else {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
            this.validator.dynamicFormGroup[this.id]?.controls[element]?.enable();
          }
        });
      } else {
        for (const key in item) {
          const element = item[key];
          element.forEach((fieldNameelement:any) => {
            const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(fieldNameelement));
            if (index != -1 && item[event] != undefined) {
              this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
              this.validator.dynamicFormGroup[this.id]?.controls[fieldNameelement]?.disable();
            } else {
              this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
              this.validator.dynamicFormGroup[this.id]?.controls[fieldNameelement]?.enable();
            }
          });
        }
      }
    }
    if (callback != undefined) {
      callback({
        event: event,
        id: this.id,
        item: item,
        dynamicFormGroup: this.validator.dynamicFormGroup[this.id],
        field: this.validator.FIELDS_DATA[this.id],
        FIELDS_DATA: this.validator.FIELDS_DATA
      })
    }
  }

  HideInputCheckBox(bool: any, item: any) {
    if (item != undefined) {
      item.forEach((element:any) => {
        const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(element?.name));
        if (index != -1) {
          if (element?.status == true) {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.enable();
          } else {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.disable();
          }
        }
      });
    }
  }

  ShowInputCheckBox(bool: any, item: any) {
    if (item != undefined) {
      item.forEach((element:any) => {
        const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(element?.name));
        if (index != -1) {
          if (element?.status == true) {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.enable();
          } else {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.disable();
          }
        }
      });
    }
  }

  onLabelNameChange(event: any, item: any ,item2:any='') {
    if (item != undefined) {
      if (item[event] != undefined) {
        for (const key in item[event]) {
          const element = item[event][key];
          const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(key));
          if (index != -1) {
            if (element['type'] = "formGroup") {
              this.validator.FIELDS_DATA[this.id][index]["NewformArray"]?.forEach((NewformArrayelement:any) => {
                let ObjectKEYS: any = Object.keys(NewformArrayelement);
                const formGroupindex = ObjectKEYS?.findIndex((val:any) => val.includes(element?.name));
                if (formGroupindex != -1) {
                  NewformArrayelement[element?.name]["label"] = element?.labelChange
                }
              });
            }
          }
        }
      } else {
        for (const key in item["default"]) {
          const element = item["default"][key];
          const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(key));
          if (index != -1) {
            if (element['type'] = "formGroup") {
              this.validator.FIELDS_DATA[this.id][index]["NewformArray"]?.forEach((NewformArrayelement:any) => {
                let ObjectKEYS: any = Object.keys(NewformArrayelement);
                const formGroupindex = ObjectKEYS?.findIndex((val:any) => val.includes(element?.name));
                if (formGroupindex != -1) {
                  NewformArrayelement[element?.name]["label"] = element?.labelChange
                }
              });
            }
          }
        }
      }
    }
  }

  AutoFillCurrency(value: any, autofillitem: any) {
    if (autofillitem != undefined && autofillitem != null && autofillitem != '') {
      if (autofillitem?.type == "formGroup") {
        this.validator.dynamicFormGroup[this.id]?.controls[autofillitem?.CONTROLS_NAME]?.controls?.forEach((element:any) => {
          element?.controls[autofillitem?.SetInputName]?.setValue(value?.type);
        });
      } else {
        this.validator.dynamicFormGroup[this.id]?.controls[autofillitem?.CONTROLS_NAME]?.controls?.setValue(value?.type);
      }
    }
  }

  onSHIPPING_BILL_EVENT(value: any) {
    this.SHIPPING_BILL_EVENT.emit(value);
  }

  onBL_COPY_EVENT(value:any, fieldName:any, fieldIndex: any, callback: any = undefined) {
    this.BL_COPY_EVENT.emit(value);
    if (callback != undefined) {
      callback({
        form: this.validator.HSCODE_FEILD_FORM.form,
        fieldName: fieldName,
        index: fieldIndex,
        value: value,
        dynamicFormGroup: this.validator.dynamicFormGroup[this.id],
        field: this.validator.FIELDS_DATA[fieldIndex],
      })
    }
  }

  CommericalListCheckBoxList: any = [];
  onCommericalListCheckBox(event:any, fieldName:any, index:any, item: any, fieldIndex: any, callback: any = undefined) {
    if (event?.checked == true) {
      this.CommericalListCheckBoxList.push(item);
    } else {
      this.CommericalListCheckBoxList.splice(index, 1);
    }
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(this.CommericalListCheckBoxList);
    if (callback != undefined) {
      callback({
        form: this.validator.HSCODE_FEILD_FORM.form,
        fieldName: fieldName,
        index: fieldIndex,
        value: item,
        dynamicFormGroup: this.validator.dynamicFormGroup[this.id],
        field: this.validator.FIELDS_DATA[fieldIndex],
      })
    }
  }

  onBankCheckBox(event:any, fieldName:any, item: any, ItemChecked:any, CheckBoxCallBack: any = undefined) {
    this.validator.CHECK_BOX_BANK_LIST.forEach((element:any) => {
      element['checked'] = false;
    });
    if (event?.checked == true) {
      ItemChecked['checked'] = true;
    } else {
      ItemChecked['checked'] = false;
    }
    this.BankEvent.emit(item);
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(item);
    if (CheckBoxCallBack != undefined) {
      CheckBoxCallBack(item)
    }
  }

  onChargerBankCheckBox(event:any, fieldName:any, item: any, ItemChecked:any, CheckBoxCallBack: any = undefined) {
    this.validator.CHECK_BOX_BANK_LIST_CHARGES.forEach((element:any) => {
      element['checked'] = false;
    });
    if (event?.checked == true) {
      ItemChecked['checked'] = true;
    } else {
      ItemChecked['checked'] = false;
    }
    this.BankEvent.emit(item);
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(item);
    if (CheckBoxCallBack != undefined) {
      CheckBoxCallBack(item)
    }
  }

  onRemitterCheckBox(event:any, fieldName:any, item: any, ItemChecked:any) {
    this.validator.CHECK_BOX_REMITTER_LIST?.forEach((element:any) => {
      element['checked'] = false;
    });
    if (event?.checked == true) {
      ItemChecked['checked'] = true;
    } else {
      ItemChecked['checked'] = false;
    }
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(item);

  }

  BANK_CHECKBOX(value: any, CHECK_BOX_BANK_LIST_CHARGES:any, EqualBankDetails: any = {}, errormsg: any = '', fieldName: any = '', dynamicFormGroup: any = undefined, callback: any = undefined) {
    if (Object.keys(EqualBankDetails)?.length != 0) {
      if (EqualBankDetails?.BankUniqueId == value?.BankUniqueId) {
        this.validator.CHECK_BOX_BANK_LIST = this.validator?.bankDetail[value?.BankUniqueId];
        this.validator.CHECK_BOX_BANK_LIST_CHARGES = []
        if (CHECK_BOX_BANK_LIST_CHARGES == true) {
          this.validator.CHECK_BOX_BANK_LIST_CHARGES = this.validator?.ToCreditAccountdata[value?.BankUniqueId];
        }
        this.validator.CHECK_BOX_BANK_LIST?.forEach((element:any) => {
          element['checked'] = false;
        });
        this.validator.CHECK_BOX_BANK_LIST_CHARGES?.forEach((element:any) => {
          element['checked'] = false;
        });
        if (callback != undefined) {
          callback(value)
        }
        this.SelectionBank.emit(value)
      } else {
        this.validator.CHECK_BOX_BANK_LIST = [];
        this.validator.CHECK_BOX_BANK_LIST_CHARGES = []
        if (CHECK_BOX_BANK_LIST_CHARGES == true) {
          this.validator.CHECK_BOX_BANK_LIST_CHARGES = [];
        }
        if (dynamicFormGroup != undefined) {
          dynamicFormGroup?.controls[fieldName]?.reset();
        }
        if (callback != undefined) {
          callback(value)
        }
        this.SelectionBank.emit(false)
      }
    } else {
      this.validator.CHECK_BOX_BANK_LIST = this.validator?.bankDetail[value?.BankUniqueId];
      this.validator.CHECK_BOX_BANK_LIST_CHARGES = []
      if (CHECK_BOX_BANK_LIST_CHARGES == true) {
        this.validator.CHECK_BOX_BANK_LIST_CHARGES = this.validator?.ToCreditAccountdata[value?.BankUniqueId];
      }
      this.validator.CHECK_BOX_BANK_LIST?.forEach((element:any) => {
        element['checked'] = false;
      });
      this.validator.CHECK_BOX_BANK_LIST_CHARGES?.forEach((element:any) => {
        element['checked'] = false;
      });
      if (callback != undefined) {
        callback(value)
      }
      this.SelectionBank.emit(value)
    }
  }

  REMITTER_CHECKBOX(value: any) {
    this.validator.CHECK_BOX_REMITTER_LIST = this.validator?.REMITTER_LIST[value?.Remitter_Name];
    this.validator.CHECK_BOX_REMITTER_LIST?.forEach((element:any) => {
      element['checked'] = false;
    });
  }

  YesNoFunction(value: any, name: any, callback:any) {
    this.setValue(value, name)
    this.YesNoCheckBoxEvent.emit(value);
    if (callback != null && callback != undefined) {
      callback(value);
    }
  }

  AddAdditionalDocuments(form:any, name:any, index:any, fromitems:any) {
    if (fromitems?.items != undefined && fromitems?.items?.length != 0) {
      fromitems?.items.push(fromitems?.items[fromitems?.items?.length - 1] + 1)
      form?.value[name]?.push()
    }
  }

  removeAdditionalDocuments(form:any, name:any, index:any, fromitems:any) {
    if (fromitems?.items != undefined && fromitems?.items?.length != 0) {
      fromitems?.items?.splice(index, 1);
      form?.value[name]?.splice(index, 1);
    }
  }

  PushValueAdditionalDocuments(args:any, form:any, name:any, index:any, fromitems:any) {
    if (fromitems?.items != undefined && fromitems?.items?.length != 0) {
      form.value[name][index] = args[1].publicUrl
    }
  }

  AdditionalDocumentsUrl: any = ''
  ViewAdditionalDocuments(doc: any) {
    this.AdditionalDocumentsUrl = ''
    setTimeout(() => {
      this.AdditionalDocumentsUrl = doc;
    }, 200);
  }

  UploadedViewPdfUrl: any = ''
  UploadedViewPdf(pdf: any) {
    this.UploadedViewPdfUrl = '';
    setTimeout(() => {
      this.UploadedViewPdfUrl = pdf;
    }, 200);
  }

  @Output('LETTER_HEADE_URL') LETTER_HEADE_URL: any = new EventEmitter();
  onFileSelect(input:any, urladd:any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = async (e: any) => {
        let data = e.target.result.substr(e.target.result.indexOf(',') + 1)
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  CancelRouterNavigate(url: any) {
    this.CancelEvent.emit({ status: true })
    if (url != undefined && url != "" && url != null) {
      this.router.navigate([url])
    }
  }

  callbuyerbene(event:any) {
    setTimeout(() => {
      this.BUYER_BENEE_EVENT?.emit(event)
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.ResetForm == true) {
      this.validator.dynamicFormGroup[this.id]?.reset();
      this.validator.CHECK_BOX_BANK_LIST = []
      this.validator.CHECK_BOX_BANK_LIST_CHARGES = [];
    }
  }

  UploadDocumentResponse(args:any, id:any, parentcontrols:any, index:any, childcontrols:any) {
    this.validator.dynamicFormGroup[id].controls[parentcontrols].value[index] = {
      [childcontrols]: args[1]
    }
    this.validator.dynamicFormGroup[id]?.controls[parentcontrols]?.controls[index]?.controls[childcontrols]?.setValue(args[1]);
  }

  onChangeMatCheckBox(id:any, parentcontrols:any, key:any, selectedOption: any) {
    const controlValue = this.validator.dynamicFormGroup[id]?.controls[parentcontrols]?.value;
    this.validator.dynamicFormGroup[id]?.controls[parentcontrols]?.setValue({
      ...controlValue,
      [key]: selectedOption?.checked
    });
  }

  callbackfill(fieldName:any, fieldIndex:any, item:any, callback: any) {
    if (callback != undefined) {
      callback({
        form: this.validator.HSCODE_FEILD_FORM.form,
        fieldName: fieldName,
        index: fieldIndex,
        value: item,
        dynamicFormGroup: this.validator.dynamicFormGroup[this.id],
        field: this.validator.FIELDS_DATA[this.id],
      })
    }
  }

  filterGroupNameData(event:any) {
    console.log(event, "filterGroupNameData")
    if (event == undefined) {
      this.NEW_PURPOSE_CODE_LIST = this.NEW_STATIC_PURPOSE_CODE_LIST;
      return;
    }
    this.NEW_PURPOSE_CODE_LIST = this.NEW_STATIC_PURPOSE_CODE_LIST?.filter((item:any) => item?.keyName == event);
  }

  filterPurposeCodeData(event:any) {
    console.log(event, "filterPurposeCodeData")
    if (event == undefined) {
      this.NEW_PURPOSE_CODE_LIST = this.NEW_STATIC_PURPOSE_CODE_LIST;
      return;
    }
    this.NEW_PURPOSE_CODE_LIST = this.NEW_STATIC_PURPOSE_CODE_LIST.filter((item1:any) => item1[item1.keyName]?.some((item2:any) => item2.text === event));
  }
}