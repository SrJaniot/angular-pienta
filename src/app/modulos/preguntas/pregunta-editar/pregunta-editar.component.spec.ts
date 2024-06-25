import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaEditarComponent } from './pregunta-editar.component';

describe('PreguntaEditarComponent', () => {
  let component: PreguntaEditarComponent;
  let fixture: ComponentFixture<PreguntaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntaEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
