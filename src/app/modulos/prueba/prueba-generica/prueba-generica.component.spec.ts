import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaGenericaComponent } from './prueba-generica.component';

describe('PruebaGenericaComponent', () => {
  let component: PruebaGenericaComponent;
  let fixture: ComponentFixture<PruebaGenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaGenericaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
