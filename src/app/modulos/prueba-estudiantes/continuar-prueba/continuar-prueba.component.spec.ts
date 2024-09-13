import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuarPruebaComponent } from './continuar-prueba.component';

describe('ContinuarPruebaComponent', () => {
  let component: ContinuarPruebaComponent;
  let fixture: ComponentFixture<ContinuarPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContinuarPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinuarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
