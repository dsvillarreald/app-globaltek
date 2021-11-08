import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBillComponent } from './review-bill.component';

describe('ReviewBillComponent', () => {
  let component: ReviewBillComponent;
  let fixture: ComponentFixture<ReviewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
