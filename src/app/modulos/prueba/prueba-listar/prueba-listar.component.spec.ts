import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaListarComponent } from './prueba-listar.component';

describe('PruebaListarComponent', () => {
  let component: PruebaListarComponent;
  let fixture: ComponentFixture<PruebaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
