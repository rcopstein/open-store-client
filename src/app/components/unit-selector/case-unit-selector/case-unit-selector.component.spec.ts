import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseUnitSelectorComponent } from './case-unit-selector.component';

describe('CaseUnitSelectorComponent', () => {
  let component: CaseUnitSelectorComponent;
  let fixture: ComponentFixture<CaseUnitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseUnitSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
