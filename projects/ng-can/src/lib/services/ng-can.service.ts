import { ElementRef, Injectable } from '@angular/core';
import {
  INgCanPermissions,
  INgCanPermissionsCheckable,
  INgCanHideApproachesControllable,
  THideApproach
} from '../ng-can.typings';

@Injectable({
  providedIn: 'root'
})
export class NgCanService implements INgCanPermissionsCheckable, INgCanHideApproachesControllable {
  private _permissions: INgCanPermissions = {};

  constructor() {
  }

  loadPermissions(permissions: { [key: string]: boolean }): void {
    this._permissions = permissions;
  }

  checkConditions(conditions: INgCanPermissions, strict?: boolean) {
    let allowed = true;

    for (const key in conditions) {
      if (!conditions.hasOwnProperty(key)) {
        continue;
      }

      if (this._permissions[key] === undefined) {
        if (!strict) {
          continue;
        }

        allowed = false;
        break;
      }

      if (this._permissions[key] !== conditions[key]) {
        allowed = false;

        break;
      }
    }

    return allowed;
  }

  hideElement(el: ElementRef, hideApproach: THideApproach): void {
    switch (hideApproach) {
      case 'visibility': {
        el.nativeElement.style.visibility = 'hidden';

        break;
      }

      case 'hidden': {
        el.nativeElement.hidden = true;

        break;
      }

      default:
        throw new Error(`Unknown Hide Approach ${hideApproach}`);
    }
  }

  showElement(el: ElementRef, hideApproach: THideApproach): void {
    switch (hideApproach) {
      case 'visibility': {
        el.nativeElement.style.visibility = 'visible';

        break;
      }

      case 'hidden': {
        el.nativeElement.hidden = false;

        break;
      }

      default:
        throw new Error(`Unknown Hide Approach ${hideApproach}`);
    }
  }
}
