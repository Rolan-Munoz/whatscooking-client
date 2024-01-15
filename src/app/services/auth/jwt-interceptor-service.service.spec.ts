import { TestBed } from '@angular/core/testing';

import { JwtInterceptorServiceService } from './jwt-interceptor-service.service';

describe('JwtInterceptorServiceService', () => {
  let service: JwtInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
