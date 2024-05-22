import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPreguntasContextoComponent } from './crear-preguntas-contexto.component';

describe('CrearPreguntasContextoComponent', () => {
  let component: CrearPreguntasContextoComponent;
  let fixture: ComponentFixture<CrearPreguntasContextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearPreguntasContextoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPreguntasContextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
