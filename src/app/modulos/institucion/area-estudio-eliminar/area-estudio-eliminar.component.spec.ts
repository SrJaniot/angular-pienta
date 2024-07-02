import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEstudioEliminarComponent } from './area-estudio-eliminar.component';

describe('AreaEstudioEliminarComponent', () => {
  let component: AreaEstudioEliminarComponent;
  let fixture: ComponentFixture<AreaEstudioEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaEstudioEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaEstudioEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
