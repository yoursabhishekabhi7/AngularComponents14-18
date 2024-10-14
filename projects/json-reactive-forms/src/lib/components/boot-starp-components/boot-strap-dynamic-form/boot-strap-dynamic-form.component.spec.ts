import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStrapDynamicFormComponent } from './boot-strap-dynamic-form.component';

describe('BootStrapDynamicFormComponent', () => {
  let component: BootStrapDynamicFormComponent;
  let fixture: ComponentFixture<BootStrapDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStrapDynamicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStrapDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
