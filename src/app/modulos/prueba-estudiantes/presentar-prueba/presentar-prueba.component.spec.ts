import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentarPruebaComponent } from './presentar-prueba.component';

describe('PresentarPruebaComponent', () => {
  let component: PresentarPruebaComponent;
  let fixture: ComponentFixture<PresentarPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentarPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
