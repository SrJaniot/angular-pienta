import { TestBed } from '@angular/core/testing';

import { PruebaControllService } from './prueba-controll.service';

describe('PruebaControllService', () => {
  let service: PruebaControllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PruebaControllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
