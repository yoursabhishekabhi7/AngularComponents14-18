import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStarpAccordionComponent } from './boot-starp-accordion.component';

describe('BootStarpAccordionComponent', () => {
  let component: BootStarpAccordionComponent;
  let fixture: ComponentFixture<BootStarpAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStarpAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStarpAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
