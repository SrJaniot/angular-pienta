import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaEstudioComponent } from './programa-estudio.component';

describe('ProgramaEstudioComponent', () => {
  let component: ProgramaEstudioComponent;
  let fixture: ComponentFixture<ProgramaEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramaEstudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
