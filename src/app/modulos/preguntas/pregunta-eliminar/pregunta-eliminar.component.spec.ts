import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaEliminarComponent } from './pregunta-eliminar.component';

describe('PreguntaEliminarComponent', () => {
  let component: PreguntaEliminarComponent;
  let fixture: ComponentFixture<PreguntaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntaEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
