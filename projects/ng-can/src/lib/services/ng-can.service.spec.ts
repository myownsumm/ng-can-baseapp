import { TestBed } from '@angular/core/testing';

import { NgCanService } from './ng-can.service';

describe('NgCanService', () => {
  let service: NgCanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgCanService
      ]
    });

    service = TestBed.get(NgCanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadPermissions function must save passed permissions into the private property', () => {
    const MOCKED_PERMISSIONS = {
      permission_a: true,
      permission_b: false
    };

    service.loadPermissions(MOCKED_PERMISSIONS);

    expect(service['_permissions']).toBe(MOCKED_PERMISSIONS);
  });

  it('checkConditions function must check passed conditions according to saved permissions', () => {
    const MOCKED_CONDITIONS = {
      can_view: true,
      can_promote: false
    };

    const MOCKED_PERMISSIONS = {
      can_view: true
    };

    service.loadPermissions(MOCKED_PERMISSIONS);

    // can_view OK
    const resultOne = service.checkConditions(MOCKED_CONDITIONS, false);
    expect(resultOne).toBeTruthy();

    // can_promote is not specified in Permissions, but it is required in Strict Mode
    const resultTwo = service.checkConditions(MOCKED_CONDITIONS, true);
    expect(resultTwo).toBeFalsy();

    // can_view does not meet
    const resultThree = service.checkConditions({can_view: false});
    expect(resultThree).toBeFalsy();
  });
});
