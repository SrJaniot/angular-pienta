import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteListarComponent } from './estudiante-listar.component';

describe('EstudianteListarComponent', () => {
  let component: EstudianteListarComponent;
  let fixture: ComponentFixture<EstudianteListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudianteListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudianteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
