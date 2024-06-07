import { TestBed } from '@angular/core/testing';

import { ScriptControllFileService } from './script-controll-file.service';

describe('ScriptControllFileService', () => {
  let service: ScriptControllFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptControllFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
