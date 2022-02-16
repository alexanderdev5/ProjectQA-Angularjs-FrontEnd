import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerProductChartComponent } from './best-seller-product-chart.component';

describe('BestSellerProductChartComponent', () => {
  let component: BestSellerProductChartComponent;
  let fixture: ComponentFixture<BestSellerProductChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellerProductChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellerProductChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
