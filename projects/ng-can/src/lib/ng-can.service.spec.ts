import { TestBed } from '@angular/core/testing';

import { NgCanService } from './ng-can.service';

describe('NgCanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgCanService = TestBed.get(NgCanService);
    expect(service).toBeTruthy();
  });
});
