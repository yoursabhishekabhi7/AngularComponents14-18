import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularModalPopup } from './modal-popup.component';

describe('AngularModalPopup', () => {
  let component: AngularModalPopup;
  let fixture: ComponentFixture<AngularModalPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularModalPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularModalPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
