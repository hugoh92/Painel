import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCapitalComponent } from './dash-capital.component';

describe('DashCapitalComponent', () => {
  let component: DashCapitalComponent;
  let fixture: ComponentFixture<DashCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
