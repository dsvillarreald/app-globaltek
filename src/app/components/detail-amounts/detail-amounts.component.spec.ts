import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAmountsComponent } from './detail-amounts.component';

describe('DetailAmountsComponent', () => {
  let component: DetailAmountsComponent;
  let fixture: ComponentFixture<DetailAmountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAmountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
