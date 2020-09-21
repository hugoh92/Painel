import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaAvancadaComponent } from './pesquisa-avancada.component';

describe('PesquisaAvancadaComponent', () => {
  let component: PesquisaAvancadaComponent;
  let fixture: ComponentFixture<PesquisaAvancadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaAvancadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaAvancadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
