import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgCanDirective } from './directives/can.directive';
import { IModuleOptions } from './ng-can.typings';
import { MODULE_OPTIONS } from './module.options';

@NgModule({
  declarations: [
    NgCanDirective
  ],
  imports: [],
  exports: [
    NgCanDirective
  ]
})
export class NgCanModule {
  static forChild(options: IModuleOptions): ModuleWithProviders {
    return {
      ngModule: NgCanModule,
      providers: [
        {
          provide: MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
}
