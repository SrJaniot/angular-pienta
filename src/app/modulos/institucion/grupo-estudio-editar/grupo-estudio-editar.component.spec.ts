import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEstudioEditarComponent } from './grupo-estudio-editar.component';

describe('GrupoEstudioEditarComponent', () => {
  let component: GrupoEstudioEditarComponent;
  let fixture: ComponentFixture<GrupoEstudioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupoEstudioEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoEstudioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
