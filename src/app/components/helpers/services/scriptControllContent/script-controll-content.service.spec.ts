import { TestBed } from '@angular/core/testing';

import { ScriptControllService } from './script-controll-content.service';

describe('ScriptControllService', () => {
  let service: ScriptControllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptControllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
