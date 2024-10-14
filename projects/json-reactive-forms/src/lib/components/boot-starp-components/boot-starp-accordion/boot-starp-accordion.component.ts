import { Component, Input, OnInit } from '@angular/core';

interface AccordionItem {
  title: string;
  items: string[];
}

@Component({
  selector: 'boot-starp-accordion',
  templateUrl: './boot-starp-accordion.component.html',
  styleUrls: ['./boot-starp-accordion.component.scss']
})
export class BootStarpAccordionComponent implements OnInit {
  @Input('AccordionItem') AccordionItem: AccordionItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
