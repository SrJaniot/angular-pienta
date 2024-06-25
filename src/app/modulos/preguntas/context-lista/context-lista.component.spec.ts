import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextListaComponent } from './context-lista.component';

describe('ContextListaComponent', () => {
  let component: ContextListaComponent;
  let fixture: ComponentFixture<ContextListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
