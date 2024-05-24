import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextEditarComponent } from './context-editar.component';

describe('ContextEditarComponent', () => {
  let component: ContextEditarComponent;
  let fixture: ComponentFixture<ContextEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
