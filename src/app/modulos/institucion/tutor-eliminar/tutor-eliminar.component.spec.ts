import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorEliminarComponent } from './tutor-eliminar.component';

describe('TutorEliminarComponent', () => {
  let component: TutorEliminarComponent;
  let fixture: ComponentFixture<TutorEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
