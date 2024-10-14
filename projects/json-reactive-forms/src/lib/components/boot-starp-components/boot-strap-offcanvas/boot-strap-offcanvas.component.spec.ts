import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStrapOffcanvasComponent } from './boot-strap-offcanvas.component';

describe('BootStrapOffcanvasComponent', () => {
  let component: BootStrapOffcanvasComponent;
  let fixture: ComponentFixture<BootStrapOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStrapOffcanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStrapOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
