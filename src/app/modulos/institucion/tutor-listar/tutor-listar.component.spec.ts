import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorListarComponent } from './tutor-listar.component';

describe('TutorListarComponent', () => {
  let component: TutorListarComponent;
  let fixture: ComponentFixture<TutorListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
