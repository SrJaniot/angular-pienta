import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPreguntaComponent } from './preview-pregunta.component';

describe('PreviewPreguntaComponent', () => {
  let component: PreviewPreguntaComponent;
  let fixture: ComponentFixture<PreviewPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewPreguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
