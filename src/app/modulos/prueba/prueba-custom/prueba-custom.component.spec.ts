import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCustomComponent } from './prueba-custom.component';

describe('PruebaCustomComponent', () => {
  let component: PruebaCustomComponent;
  let fixture: ComponentFixture<PruebaCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
