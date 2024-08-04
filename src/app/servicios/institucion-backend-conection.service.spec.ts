import { TestBed } from '@angular/core/testing';

import { InstitucionBackendConectionService } from './institucion-backend-conection.service';

describe('InstitucionBackendConectionService', () => {
  let service: InstitucionBackendConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitucionBackendConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
