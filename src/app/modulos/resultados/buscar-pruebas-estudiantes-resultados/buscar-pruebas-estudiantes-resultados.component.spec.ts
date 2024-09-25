import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPruebasEstudiantesResultadosComponent } from './buscar-pruebas-estudiantes-resultados.component';

describe('BuscarPruebasEstudiantesResultadosComponent', () => {
  let component: BuscarPruebasEstudiantesResultadosComponent;
  let fixture: ComponentFixture<BuscarPruebasEstudiantesResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarPruebasEstudiantesResultadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarPruebasEstudiantesResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
