import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPaymentComponent } from './display-payment.component';

describe('DisplayPaymentComponent', () => {
  let component: DisplayPaymentComponent;
  let fixture: ComponentFixture<DisplayPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
