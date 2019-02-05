import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgCanService } from '../services/ng-can.service';
import { INgCanPermissions } from '../ng-can.typings';

@Directive({
  selector: '[ng-can]'
})
export class NgCanDirective implements OnInit {
  @Input() conditions: INgCanPermissions = {};
  @Input() permissions: INgCanPermissions = {};
  @Input() strictMode: boolean;

  constructor(protected el: ElementRef, protected ngCanService: NgCanService) {
    this.hideElement();
  }

  ngOnInit(): void {
    this.ngCanService.loadPermissions(this.permissions);
    const needToShow = this.ngCanService.checkConditions(this.conditions, this.strictMode);

    if (needToShow) {
      this.showElement();
    }
  }

  hideElement() {
    this.el.nativeElement.style.visibility = 'hidden';
  }

  showElement() {
    this.el.nativeElement.style.visibility = 'visible';
  }
}
