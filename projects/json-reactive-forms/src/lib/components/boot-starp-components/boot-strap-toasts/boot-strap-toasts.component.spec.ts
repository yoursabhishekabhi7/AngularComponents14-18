import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStrapToastsComponent } from './boot-strap-toasts.component';

describe('BootStrapToastsComponent', () => {
  let component: BootStrapToastsComponent;
  let fixture: ComponentFixture<BootStrapToastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStrapToastsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStrapToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
