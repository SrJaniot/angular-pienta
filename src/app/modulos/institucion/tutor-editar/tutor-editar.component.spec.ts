import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorEditarComponent } from './tutor-editar.component';

describe('TutorEditarComponent', () => {
  let component: TutorEditarComponent;
  let fixture: ComponentFixture<TutorEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
