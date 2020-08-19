import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeUnitSelectorComponent } from './shoe-unit-selector.component';

describe('ShoeUnitSelectorComponent', () => {
  let component: ShoeUnitSelectorComponent;
  let fixture: ComponentFixture<ShoeUnitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoeUnitSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
