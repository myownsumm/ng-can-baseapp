import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCanDirective } from './can.directive';
import { Component, DebugElement } from '@angular/core';

@Component({
  template: `
    <div id="some-div" ng-can [conditions]="{read: true}" [permissions]="{read: false}"></div>`,
  providers: [
    NgCanDirective
  ]
})
class SandboxOneComponent {
}

@Component({
  template: `
    <div id="some-div-2" ng-can [conditions]="{read: true}" [permissions]="{read: true}"></div>`,
  providers: [
    NgCanDirective
  ]
})
class SandboxTwoComponent {
}

describe('NgCanDirective', () => {
  let componentOne: SandboxOneComponent;
  let fixtureOne: ComponentFixture<SandboxOneComponent>;
  let debugElementOne: DebugElement;

  let componentTwo: SandboxOneComponent;
  let fixtureTwo: ComponentFixture<SandboxOneComponent>;
  let debugElementTwo: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SandboxOneComponent,
        SandboxTwoComponent,
        NgCanDirective
      ]
    });

    fixtureOne = TestBed.createComponent(SandboxOneComponent);
    componentOne = fixtureOne.componentInstance;
    debugElementOne = fixtureOne.debugElement;

    fixtureTwo = TestBed.createComponent(SandboxTwoComponent);
    componentTwo = fixtureTwo.componentInstance;
    debugElementTwo = fixtureTwo.debugElement;

    fixtureOne.detectChanges();
    fixtureTwo.detectChanges();
  });

  it('should hide SandboxOneComponent', () => {
    const node = debugElementOne.nativeElement.querySelector('#some-div');

    expect(node.style.visibility).toBe('hidden');
  });

  it('should show SandboxTwoComponent', () => {
    const node = debugElementTwo.nativeElement.querySelector('#some-div-2');

    expect(node.style.visibility).not.toBe('hidden');
  });
});
