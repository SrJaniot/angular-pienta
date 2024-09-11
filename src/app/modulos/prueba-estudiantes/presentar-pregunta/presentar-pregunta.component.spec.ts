import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentarPreguntaComponent } from './presentar-pregunta.component';

describe('PresentarPreguntaComponent', () => {
  let component: PresentarPreguntaComponent;
  let fixture: ComponentFixture<PresentarPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentarPreguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
