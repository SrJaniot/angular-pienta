import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosPruebaComponent } from './resultados-prueba.component';

describe('ResultadosPruebaComponent', () => {
  let component: ResultadosPruebaComponent;
  let fixture: ComponentFixture<ResultadosPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadosPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
