import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaListaComponent } from './pregunta-lista.component';

describe('PreguntaListaComponent', () => {
  let component: PreguntaListaComponent;
  let fixture: ComponentFixture<PreguntaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntaListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
