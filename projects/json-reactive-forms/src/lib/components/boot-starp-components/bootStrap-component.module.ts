import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootStarpAccordionComponent } from './boot-starp-accordion/boot-starp-accordion.component';
import { BootStarpCarouselComponent } from './boot-starp-carousel/boot-starp-carousel.component';
import { BootStrapDropdownsComponent } from './boot-strap-dropdowns/boot-strap-dropdowns.component';
import { BootStrapDynamicFormComponent } from './boot-strap-dynamic-form/boot-strap-dynamic-form.component';
import { BootStrapModalComponent } from './boot-strap-modal/boot-strap-modal.component';
import { BootStrapOffcanvasComponent } from './boot-strap-offcanvas/boot-strap-offcanvas.component';
import { BootStrapToastsComponent } from './boot-strap-toasts/boot-strap-toasts.component';
import { SharedHomeModule } from '../shared-home.module';
import { ModalPopupService } from './modal-popup/modal-popup.service';
import { AngularModalPopup } from './modal-popup/modal-popup.component';

@NgModule({
  declarations: [
    BootStarpAccordionComponent,
    BootStarpCarouselComponent,
    BootStrapDropdownsComponent,
    BootStrapDynamicFormComponent,
    BootStrapModalComponent,
    BootStrapOffcanvasComponent,
    BootStrapToastsComponent,
    AngularModalPopup
  ],
  imports: [
    CommonModule,
    SharedHomeModule
  ],
  providers:[ModalPopupService],
  exports: [
    BootStarpAccordionComponent,
    BootStarpCarouselComponent,
    BootStrapDropdownsComponent,
    BootStrapDynamicFormComponent,
    BootStrapModalComponent,
    BootStrapOffcanvasComponent,
    BootStrapToastsComponent,
    AngularModalPopup
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BootStrapComponentModule {
  ScriptElement?: HTMLScriptElement;
  constructor() {
    // bootstrap script.js add in body
    this.ScriptElement = document.createElement("script");
    this.ScriptElement.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(this.ScriptElement);

    // bootstrap .css add in head
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';
    document.head.appendChild(linkElement);
  }
}
