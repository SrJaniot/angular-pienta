import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEstudioEliminarComponent } from './grupo-estudio-eliminar.component';

describe('GrupoEstudioEliminarComponent', () => {
  let component: GrupoEstudioEliminarComponent;
  let fixture: ComponentFixture<GrupoEstudioEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupoEstudioEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoEstudioEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
