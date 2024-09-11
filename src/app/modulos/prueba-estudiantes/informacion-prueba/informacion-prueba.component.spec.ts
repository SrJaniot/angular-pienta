import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPruebaComponent } from './informacion-prueba.component';

describe('InformacionPruebaComponent', () => {
  let component: InformacionPruebaComponent;
  let fixture: ComponentFixture<InformacionPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
