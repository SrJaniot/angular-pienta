import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeListarComponent } from './sede-listar.component';

describe('SedeListarComponent', () => {
  let component: SedeListarComponent;
  let fixture: ComponentFixture<SedeListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SedeListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SedeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
