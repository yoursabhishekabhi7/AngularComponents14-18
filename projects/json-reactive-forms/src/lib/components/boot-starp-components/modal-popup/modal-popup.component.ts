import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalPopupService } from './modal-popup.service';

@Component({
  selector: 'modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class AngularModalPopup implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  protected _dialog = inject(Dialog);
  protected modal_popup_service = inject(ModalPopupService);

  ngOnInit(): void {
    console.log('Modal init');
  }

  closeModal() {
    this.modal_popup_service.close()
  }

  confirm() {
    this.closeModal();
  }

  close() {
    this.closeMeEvent.emit();
  }

  ngOnDestroy(): void {
    this.closeModal();
  }
}
