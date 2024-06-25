import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionListaComponent } from './opcion-lista.component';

describe('OpcionListaComponent', () => {
  let component: OpcionListaComponent;
  let fixture: ComponentFixture<OpcionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcionListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
