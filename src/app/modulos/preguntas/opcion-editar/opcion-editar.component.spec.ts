import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionEditarComponent } from './opcion-editar.component';

describe('OpcionEditarComponent', () => {
  let component: OpcionEditarComponent;
  let fixture: ComponentFixture<OpcionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcionEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
