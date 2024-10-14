import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveJsonFormsService } from "./service/upload-service-validator.service";
import { UploadComponentsComponent } from "./upload-components/upload-components.component";
import { InnerDynamicErrorComponent } from "./upload-components/inner-dynamic-error/inner-dynamic-error.component";
import { MoreContentComponent } from "./upload-components/more-content/more-content.component";
import { SharedHomeModule } from "../shared-home.module";

@NgModule({
  declarations: [
    UploadComponentsComponent,
    InnerDynamicErrorComponent,
    MoreContentComponent
  ],
  imports: [
    CommonModule,
    SharedHomeModule
  ],
  providers: [ReactiveJsonFormsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    UploadComponentsComponent,
    InnerDynamicErrorComponent,
    MoreContentComponent
  ],
})
export class ComponentsSharedHomeModule { }