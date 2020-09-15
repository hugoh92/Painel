import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavEstComponent } from './sidenav-est.component';

describe('SidenavEstComponent', () => {
  let component: SidenavEstComponent;
  let fixture: ComponentFixture<SidenavEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
