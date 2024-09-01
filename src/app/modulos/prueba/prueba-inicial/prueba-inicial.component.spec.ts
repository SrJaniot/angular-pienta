import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaInicialComponent } from './prueba-inicial.component';

describe('PruebaInicialComponent', () => {
  let component: PruebaInicialComponent;
  let fixture: ComponentFixture<PruebaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
