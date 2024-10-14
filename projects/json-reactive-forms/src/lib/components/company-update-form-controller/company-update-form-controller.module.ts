import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepTrackerIconsComponent } from './company-update-step-nav/step-tracker-icons.component';
import { FormControllerComponent } from './company-update-form/form.component';
import { CompanyUpdateFormControllerService } from './company-update-form/form.service';
import { BootStrapComponentModule } from '../boot-starp-components/bootStrap-component.module';
import { SharedHomeModule } from '../shared-home.module';

@NgModule({
  declarations: [
    StepTrackerIconsComponent,
    FormControllerComponent,
  ],
  providers: [CompanyUpdateFormControllerService],
  imports: [
    CommonModule,
    BootStrapComponentModule,
    SharedHomeModule
  ],
  exports: [
    StepTrackerIconsComponent,
    FormControllerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class FormControllerModule { }
