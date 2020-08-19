import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeProductDetailsComponent } from './shoe-product-details.component';

describe('ShoeProductDetailsComponent', () => {
  let component: ShoeProductDetailsComponent;
  let fixture: ComponentFixture<ShoeProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoeProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
