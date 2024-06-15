import { TestBed } from '@angular/core/testing';

import { ScriptControllContentService } from './script-controll-content.service';

describe('ScriptControllService', () => {
  let service: ScriptControllContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptControllContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
