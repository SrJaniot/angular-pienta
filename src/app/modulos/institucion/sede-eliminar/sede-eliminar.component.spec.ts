import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeEliminarComponent } from './sede-eliminar.component';

describe('SedeEliminarComponent', () => {
  let component: SedeEliminarComponent;
  let fixture: ComponentFixture<SedeEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SedeEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SedeEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
