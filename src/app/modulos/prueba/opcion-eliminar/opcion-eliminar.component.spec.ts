import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionEliminarComponent } from './opcion-eliminar.component';

describe('OpcionEliminarComponent', () => {
  let component: OpcionEliminarComponent;
  let fixture: ComponentFixture<OpcionEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcionEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
