
# Project Title

A brief description of what this project does and who it's for

# JsonReactiveForms

**JsonReactiveForms** is an Angular library for creating dynamic reactive forms using a JSON configuration. It simplifies the form-building process and enhances the management of form states.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Importing Modules](#importing-modules)
  - [Building a Form](#building-a-form)
  - [Example Configuration](#example-configuration)
- [Features](#features)

## Installation

To install the library, use the Angular CLI:

```bash
npm i json-reactive-forms


## Add AppModule

import { ComponentsSharedHomeModule } from 'json-reactive-forms';

@NgModule({
  declarations: [],
  imports: [
    ComponentsSharedHomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

## Building a Form
 - You can build a reactive form using the form_service provided by the library. Follow these steps:

## Include the <upload-components> directive in your HTML:
 - html
 - <upload-components id="newform" [CancelRoute]="'/home'" (SubmitEvent)="onSubmit($event)"></upload-components>
##Use the buildForm method to generate the form:
 - typescript
this.form_service.buildForm({
  name: {
    type: "text",
    value: "",
    label: "your label name",
    rules: {
      required: true,
    }
  }
}, "newform").then((res) => {
  // Handle the response here
});

## Example Configuration
 - Here’s an example of how to define a form configuration in JSON:
 {
  "name": {
    "type": "text",
    "value": "",
    "label": "your label name",
    "rules": {
      "required": true
    }
  }
}

## Features
   - Dynamic Form Generation: Easily create forms based on JSON configurations.
   - Reactive Forms Support: Fully compatible with Angular's reactive forms.
   - Custom Validation: Define validation rules directly in the JSON schema.
   - Reusable Components: Build forms using shared components across your application.


Here’s how you can structure the README file to document all the types of fields in your dynamic form component, using the provided JSON format as a reference:

## Adding Bootstrap Styles
To use Bootstrap styles in your Angular project, follow these steps:

- Install Bootstrap: **npm install bootstrap**

## Update angular.json:
- After installing Bootstrap, you need to add the Bootstrap CSS file to the styles array in - - your angular.json file. Open angular.json and locate the styles array under the build - - -- options. It should look like this:
		"projects": {
  "your-project-name": {
    "architect": {
      "build": {
        "options": {
          "styles": [
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
          ]
        }
      }
    }
  }
}
 - Make sure to replace "your-project-name" with the actual name of your Angular project.

## Rebuild Your Project:
After making these changes, rebuild your project for the styles to take effect. You can do this by running:

## Dynamic Form Component
- This document describes the structure and usage of the Dynamic   Form Component.

## Properties dynamicForm
 - CancelRoute: string

- The router path to redirect when canceling the form.
   - id: string

- Unique identifier for the form instance.
  - SubmitEvent: EventEmitter<any>

- Event emitted on form submission.
  - fields: Array<Object>

List of form fields. Each field is an object containing the following properties:
Field Types
1. MultipleButton
label: string (Required)
Label for the button group.
rules: Object
Validation rules (e.g., { required: true }).
buttonList: Array<Object>
List of buttons:
buttonText: string (Required)
buttonStyle: Object (Optional)
buttonDisabled: boolean (Optional)
NgClass: string (Optional)
callback: string (Function name for button action)
IconClass: string (Optional)
IconStyle: Object (Optional)
DivStyle: Object (Optional)

2. EmailButton
label: string (Required)
rules: Object
placeholderText: string (Optional)
InputType: string (Default: "email")
buttonText: string (Required)
callback: string (Function name for submit action)
InputStyle: Object (Optional)
InputDisabled: boolean (Optional)
3. NumberButton
Similar structure to EmailButton, but with:
InputType: string (Default: "number")
placeholderText: string (Optional)
4. Password
label: string (Required)
rules: Object
placeholderText: string (Optional)
showhide: boolean (Optional)
5. Date
label: string (Required)
rules: Object
InputType: string (Default: "date")
placeholderText: string (Optional)
6. Currency
label: string (Required)
rules: Object
placeholderText: string (Optional)
InputDisabled: boolean (Optional)
7. MatCheckBox
label: string (Required)
rules: Object
items: Array<Object> (Required)
Each item should contain:
text: string
value: string
8. MultipleMatCheckBox
label: string (Required)
rules: Object
options: Array<string> (Required)
9. MultiCheckBox
label: string (Required)
rules: Object
checkboxLabel: Array<Object> (Optional)
Each checkbox should contain:
label: string

