import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPruebaComponent } from './preview-prueba.component';

describe('PreviewPruebaComponent', () => {
  let component: PreviewPruebaComponent;
  let fixture: ComponentFixture<PreviewPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
