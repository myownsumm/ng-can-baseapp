export interface INgCanPermissionsCheckable {
  loadPermissions(permissions: INgCanPermissions): void;

  checkConditions(conditions: INgCanPermissions, strict?: boolean): boolean;
}

export interface INgCanPermissions {
  [key: string]: boolean;
}

export type THideApproach = 'visibility';

export interface IModuleOptions {
  hide_approach: THideApproach;
}
