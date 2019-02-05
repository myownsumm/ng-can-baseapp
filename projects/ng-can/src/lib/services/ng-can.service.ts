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

  checkConditions(conditions: INgCanPermissions, strict: boolean) {
    let show = true;

    for (const key in conditions) {
      if ((strict && this._permissions[key] === undefined) || this._permissions[key] === conditions[key]) {
        show = false;

        break;
      }
    }

    return show;
  }
}
