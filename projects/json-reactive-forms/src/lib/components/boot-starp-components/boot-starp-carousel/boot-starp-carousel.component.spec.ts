import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootStarpCarouselComponent } from './boot-starp-carousel.component';

describe('BootStarpCarouselComponent', () => {
  let component: BootStarpCarouselComponent;
  let fixture: ComponentFixture<BootStarpCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootStarpCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootStarpCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
