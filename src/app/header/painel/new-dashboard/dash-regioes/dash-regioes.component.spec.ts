import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRegioesComponent } from './dash-regioes.component';

describe('DashRegioesComponent', () => {
  let component: DashRegioesComponent;
  let fixture: ComponentFixture<DashRegioesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashRegioesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashRegioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
