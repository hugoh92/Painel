import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashOrgAcademicaComponent } from './dash-org-academica.component';

describe('DashOrgAcademicaComponent', () => {
  let component: DashOrgAcademicaComponent;
  let fixture: ComponentFixture<DashOrgAcademicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashOrgAcademicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashOrgAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
