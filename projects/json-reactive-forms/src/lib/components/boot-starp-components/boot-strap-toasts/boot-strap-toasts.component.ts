import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'boot-strap-toasts',
  templateUrl: './boot-strap-toasts.component.html',
  styleUrls: ['./boot-strap-toasts.component.scss']
})
export class BootStrapToastsComponent implements OnInit, OnChanges {
  @Input("TitleText") TitleText: string=''
  @Input("TimeStamp") TimeStamp: string=''
  @Input("ShowTost") ShowTost: boolean = false
  SHOW: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        if (change.currentValue !== undefined) {
          (this as any)[propName] = change.currentValue;
        }
      }
    }
    if (this.ShowTost == true) {
      this.OpenModel;
    }
  }

  get OpenModel() {
    $('.toast').removeClass('hide')
    return $('.toast').addClass('show')
  }

  get hideModel() {
    $('.toast').removeClass('show')
    return $('.toast').addClass('hide')
  }

}
