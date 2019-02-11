import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { NgCanService } from '../services/ng-can.service';
import { IModuleOptions, INgCanPermissions, THideApproach } from '../ng-can.typings';
import { MODULE_OPTIONS } from '../module.options';

@Directive({
  selector: '[ng-can]'
})
export class NgCanDirective implements OnInit {
  @Input() conditions: INgCanPermissions = {};
  @Input() permissions: INgCanPermissions = {};
  @Input() strictMode: boolean;
  @Input() hideApproach: THideApproach = this.options.hide_approach;

  constructor(protected el: ElementRef, protected ngCanService: NgCanService,
              @Inject(MODULE_OPTIONS) protected options: IModuleOptions) {
  }

  ngOnInit(): void {
    this.hideElement();

    this.ngCanService.loadPermissions(this.permissions);
    const needToShow = this.ngCanService.checkConditions(this.conditions, this.strictMode);

    if (needToShow) {
      this.showElement();
    }
  }

  hideElement() {
    this.ngCanService.hideElement(this.el, this.hideApproach);
  }

  showElement() {
    this.ngCanService.showElement(this.el, this.hideApproach);
  }
}
