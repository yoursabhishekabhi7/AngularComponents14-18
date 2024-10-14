import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStrapModalComponent } from './boot-strap-modal.component';

describe('BootStrapModalComponent', () => {
  let component: BootStrapModalComponent;
  let fixture: ComponentFixture<BootStrapModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStrapModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStrapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
