import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaEstudioListarComponent } from './programa-estudio-listar.component';

describe('ProgramaEstudioListarComponent', () => {
  let component: ProgramaEstudioListarComponent;
  let fixture: ComponentFixture<ProgramaEstudioListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramaEstudioListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaEstudioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
