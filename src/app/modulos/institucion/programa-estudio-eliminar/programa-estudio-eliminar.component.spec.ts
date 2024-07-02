import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaEstudioEliminarComponent } from './programa-estudio-eliminar.component';

describe('ProgramaEstudioEliminarComponent', () => {
  let component: ProgramaEstudioEliminarComponent;
  let fixture: ComponentFixture<ProgramaEstudioEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramaEstudioEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaEstudioEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
