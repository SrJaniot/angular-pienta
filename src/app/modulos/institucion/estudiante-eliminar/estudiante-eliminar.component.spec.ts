import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteEliminarComponent } from './estudiante-eliminar.component';

describe('EstudianteEliminarComponent', () => {
  let component: EstudianteEliminarComponent;
  let fixture: ComponentFixture<EstudianteEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudianteEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudianteEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
