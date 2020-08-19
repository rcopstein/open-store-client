import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseProductDetailsComponent } from './case-product-details.component';

describe('CaseProductDetailsComponent', () => {
  let component: CaseProductDetailsComponent;
  let fixture: ComponentFixture<CaseProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
