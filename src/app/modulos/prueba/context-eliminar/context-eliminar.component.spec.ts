import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextEliminarComponent } from './context-eliminar.component';

describe('ContextEliminarComponent', () => {
  let component: ContextEliminarComponent;
  let fixture: ComponentFixture<ContextEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
