import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaEstudioEditarComponent } from './programa-estudio-editar.component';

describe('ProgramaEstudioEditarComponent', () => {
  let component: ProgramaEstudioEditarComponent;
  let fixture: ComponentFixture<ProgramaEstudioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramaEstudioEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaEstudioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
