import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCanDirective } from './can.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { MODULE_OPTIONS } from '../module.options';

@Component({
  template: `
    <div id="some-div" ng-can [conditions]="{read: true}" [permissions]="{read: false}"></div>`,
  providers: [
    NgCanDirective
  ]
})
class SandboxOneComponent {
  @ViewChild(NgCanDirective) ngCanDirective;
}

@Component({
  template: `
    <div id="some-div-2" ng-can [conditions]="{read: true}" [permissions]="{read: true}"
         [hideApproach]="'hidden'"></div>`,
  providers: [
    NgCanDirective
  ]
})
class SandboxTwoComponent {
  @ViewChild(NgCanDirective) ngCanDirective;
}


@Component({
  template: `
    <div id="some-div-3" ng-can [conditions]="{read: true}" [permissions]="{read: false}"
         [hideApproach]="'hidden'"></div>`,
  providers: [
    NgCanDirective
  ]
})
class SandboxThreeComponent {
  @ViewChild(NgCanDirective) ngCanDirective;
}

describe('NgCanDirective', () => {
  let componentOne: SandboxOneComponent;
  let fixtureOne: ComponentFixture<SandboxOneComponent>;
  let debugElementOne: DebugElement;

  let componentTwo: SandboxTwoComponent;
  let fixtureTwo: ComponentFixture<SandboxTwoComponent>;
  let debugElementTwo: DebugElement;

  let componentThree: SandboxThreeComponent;
  let fixtureThree: ComponentFixture<SandboxThreeComponent>;
  let debugElementThree: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SandboxOneComponent,
        SandboxTwoComponent,
        SandboxThreeComponent,
        NgCanDirective
      ],
      providers: [
        {
          provide: MODULE_OPTIONS,
          useValue: {
            hide_approach: 'visibility'
          }
        },
      ]
    });

    fixtureOne = TestBed.createComponent(SandboxOneComponent);
    componentOne = fixtureOne.componentInstance;
    debugElementOne = fixtureOne.debugElement;

    fixtureTwo = TestBed.createComponent(SandboxTwoComponent);
    componentTwo = fixtureTwo.componentInstance;
    debugElementTwo = fixtureTwo.debugElement;

    fixtureThree = TestBed.createComponent(SandboxThreeComponent);
    componentThree = fixtureThree.componentInstance;
    debugElementThree = fixtureThree.debugElement;

    fixtureOne.detectChanges();
    fixtureTwo.detectChanges();
    fixtureThree.detectChanges();
  });

  it('should hide SandboxOneComponent by permissions/conditions set', () => {
    const node = debugElementOne.nativeElement.querySelector('#some-div');

    expect(node.style.visibility).toBe('hidden');
  });

  it('should show SandboxTwoComponent by permissions/conditions set', () => {
    const node = debugElementTwo.nativeElement.querySelector('#some-div-2');

    expect(node.style.visibility).not.toBe('hidden');
  });

  it('should use default Hide Approach set from Module Options, but it can be overwritten by [hideApproach] property', () => {
    expect(componentOne.ngCanDirective['hideApproach']).toBe('visibility');
    expect(componentTwo.ngCanDirective['hideApproach']).toBe('hidden');
  });

  it('should control visibility property with Hide Approach "visibility"', () => {
    const node = debugElementOne.nativeElement.querySelector('#some-div');
    expect(node.style.visibility).toBe('hidden');
  });

  it('should control hidden HTML property with Hide Approach "hidden"', () => {
    const node = debugElementThree.nativeElement.querySelector('#some-div-3');
    expect(node.hidden).toBe(true);
  });
});
