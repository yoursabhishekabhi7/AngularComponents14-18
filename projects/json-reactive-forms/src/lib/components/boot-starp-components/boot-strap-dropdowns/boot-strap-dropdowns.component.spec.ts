import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStrapDropdownsComponent } from './boot-strap-dropdowns.component';

describe('BootStrapDropdownsComponent', () => {
  let component: BootStrapDropdownsComponent;
  let fixture: ComponentFixture<BootStrapDropdownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStrapDropdownsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStrapDropdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
