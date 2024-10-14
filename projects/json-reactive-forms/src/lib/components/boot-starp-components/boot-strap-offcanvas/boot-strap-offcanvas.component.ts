import { Component, Input, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'boot-strap-offcanvas',
  templateUrl: './boot-strap-offcanvas.component.html',
  styleUrls: ['./boot-strap-offcanvas.component.scss']
})
export class BootStrapOffcanvasComponent implements OnInit {
  @Input("TitleText") TitleText: string =''
  @Input("TimeStamp") TimeStamp: string =''
  constructor() { }

  ngOnInit(): void {
  }

  get OpenModel() {
    $('#customoffcanvas').removeClass('hide')
    return $('#customoffcanvas').addClass('show');
  }

  get hideModel() {
    $('#customoffcanvas').removeClass('show');
    return $('#customoffcanvas').addClass('hide')
  }

}
