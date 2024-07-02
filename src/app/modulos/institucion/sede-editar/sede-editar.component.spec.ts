import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeEditarComponent } from './sede-editar.component';

describe('SedeEditarComponent', () => {
  let component: SedeEditarComponent;
  let fixture: ComponentFixture<SedeEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SedeEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SedeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
