import { Component, Input, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'boot-strap-modal',
  templateUrl: './boot-strap-modal.component.html',
  styleUrls: ['./boot-strap-modal.component.scss']
})
export class BootStrapModalComponent implements OnInit {
  @Input("ModalTitle") ModalTitle:string=''
  
  constructor() { }

  ngOnInit(): void {
  }

  get OpenModel(){
    $('#CustomModel').removeClass("hide")
    return $('#CustomModel').addClass("show");
  }

  get CloseModel(){
    $('#CustomModel').removeClass("show")
    return $('#CustomModel').addClass("hide");
  }

}
