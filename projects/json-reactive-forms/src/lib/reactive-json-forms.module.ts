
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveJsonFormsService } from "./components/reactive-json-forms-controller/service/upload-service-validator.service";
import { ReactiveJsonFormsComponent } from "./reactive-json-forms.component";
import { CommonModule } from "@angular/common";
import { SharedHomeModule } from "./components/shared-home.module";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsSharedHomeModule } from "./components/reactive-json-forms-controller/Components-home.module";

@NgModule({
  declarations: [
    ReactiveJsonFormsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    SharedHomeModule,
    ComponentsSharedHomeModule
  ],
  exports: [
    ReactiveJsonFormsComponent,
  ],
  providers: [ReactiveJsonFormsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReactiveJsonFormsModule { }