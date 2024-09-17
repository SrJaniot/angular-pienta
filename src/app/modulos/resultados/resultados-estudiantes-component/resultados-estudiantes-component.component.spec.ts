import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosEstudiantesComponentComponent } from './resultados-estudiantes-component.component';

describe('ResultadosEstudiantesComponentComponent', () => {
  let component: ResultadosEstudiantesComponentComponent;
  let fixture: ComponentFixture<ResultadosEstudiantesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosEstudiantesComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadosEstudiantesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
