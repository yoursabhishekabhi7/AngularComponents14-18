import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveJsonFormsComponent } from './reactive-json-forms.component';

describe('ReactiveJsonFormsComponent', () => {
  let component: ReactiveJsonFormsComponent;
  let fixture: ComponentFixture<ReactiveJsonFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveJsonFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveJsonFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
