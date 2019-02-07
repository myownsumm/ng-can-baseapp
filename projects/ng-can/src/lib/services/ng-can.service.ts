import { Injectable } from '@angular/core';
import { INgCanPermissions, INgCanPermissionsCheckable } from '../ng-can.typings';

@Injectable({
  providedIn: 'root'
})
export class NgCanService implements INgCanPermissionsCheckable {
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
}
