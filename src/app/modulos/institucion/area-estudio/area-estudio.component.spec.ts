import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEstudioComponent } from './area-estudio.component';

describe('AreaEstudioComponent', () => {
  let component: AreaEstudioComponent;
  let fixture: ComponentFixture<AreaEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaEstudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
