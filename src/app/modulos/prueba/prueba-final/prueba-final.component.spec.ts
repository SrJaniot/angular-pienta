import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaFinalComponent } from './prueba-final.component';

describe('PruebaFinalComponent', () => {
  let component: PruebaFinalComponent;
  let fixture: ComponentFixture<PruebaFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
