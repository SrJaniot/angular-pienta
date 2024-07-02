import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEstudioListarComponent } from './area-estudio-listar.component';

describe('AreaEstudioListarComponent', () => {
  let component: AreaEstudioListarComponent;
  let fixture: ComponentFixture<AreaEstudioListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaEstudioListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaEstudioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
