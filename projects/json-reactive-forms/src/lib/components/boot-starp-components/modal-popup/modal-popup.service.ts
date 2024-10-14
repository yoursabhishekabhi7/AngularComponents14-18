import { ElementRef, ViewChild } from '@angular/core';
import { AngularModalPopup } from './modal-popup.component';
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  TemplateRef,
  Type,
  ViewContainerRef,
  createComponent,
} from '@angular/core';
import { Options } from './modal-options';

@Injectable({
  providedIn: 'root'
})
export class ModalPopupService {
  newModalComponent!: ComponentRef<AngularModalPopup>;
  options!: any;

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) { }
  @ViewChild(AngularModalPopup) uploadContainer!: ViewContainerRef;
  open(vcrOrComponent: ViewContainerRef, options?: Options): void;

  open<C>(vcrOrComponent: Type<C>, options?: Options): void;

  open<C>(vcrOrComponent: ViewContainerRef | Type<C>, options?: Options) {
    if (vcrOrComponent instanceof ViewContainerRef) {
      this.openWithTemplate(vcrOrComponent, vcrOrComponent, options);
      this.options = options;
    } else {
      this.openWithComponent(vcrOrComponent, options);
      this.options = options;
    }
  }

  private openWithTemplate(vcr: ViewContainerRef, content: ViewContainerRef, options: any) {
    this.newModalComponent = createComponent(AngularModalPopup, {
      environmentInjector: this.injector,
      projectableNodes: [content?.element?.nativeElement],
    });
    this.newModalComponent.instance.title = options?.title;
    this.newModalComponent.instance.body = options?.body
    document.body.appendChild(this.newModalComponent.location.nativeElement);
    // Attach views to the changeDetection cycle
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  private openWithComponent(component: Type<unknown>, options: any) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.newModalComponent = createComponent(AngularModalPopup, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });
    this.newModalComponent.instance.title = options?.title;
    this.newModalComponent.instance.body = options?.body
    document.body.appendChild(this.newModalComponent.location.nativeElement);

    // Attach views to the changeDetection cycle
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.appRef.detachView(this.newModalComponent.hostView)
    this.newModalComponent.onDestroy;
  }
}
