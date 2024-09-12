import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosCondicionesPruebaComponent } from './terminos-condiciones-prueba.component';

describe('TerminosCondicionesPruebaComponent', () => {
  let component: TerminosCondicionesPruebaComponent;
  let fixture: ComponentFixture<TerminosCondicionesPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminosCondicionesPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerminosCondicionesPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
