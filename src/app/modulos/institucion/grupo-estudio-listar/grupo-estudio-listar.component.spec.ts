import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEstudioListarComponent } from './grupo-estudio-listar.component';

describe('GrupoEstudioListarComponent', () => {
  let component: GrupoEstudioListarComponent;
  let fixture: ComponentFixture<GrupoEstudioListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupoEstudioListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoEstudioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
