import { TestBed } from '@angular/core/testing';

import { FecsService } from './fecs.service';

describe('FecsService', () => {
  let service: FecsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FecsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
