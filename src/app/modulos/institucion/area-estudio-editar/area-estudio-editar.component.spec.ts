import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEstudioEditarComponent } from './area-estudio-editar.component';

describe('AreaEstudioEditarComponent', () => {
  let component: AreaEstudioEditarComponent;
  let fixture: ComponentFixture<AreaEstudioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaEstudioEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaEstudioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
