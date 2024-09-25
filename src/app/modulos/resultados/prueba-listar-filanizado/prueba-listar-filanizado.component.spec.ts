import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaListarFilanizadoComponent } from './prueba-listar-filanizado.component';

describe('PruebaListarFilanizadoComponent', () => {
  let component: PruebaListarFilanizadoComponent;
  let fixture: ComponentFixture<PruebaListarFilanizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaListarFilanizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaListarFilanizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
