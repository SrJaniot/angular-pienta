import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaGrupoComponent } from './matricula-grupo.component';

describe('MatriculaGrupoComponent', () => {
  let component: MatriculaGrupoComponent;
  let fixture: ComponentFixture<MatriculaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatriculaGrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatriculaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
