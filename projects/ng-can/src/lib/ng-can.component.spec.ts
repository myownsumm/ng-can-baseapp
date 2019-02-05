import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCanComponent } from './ng-can.component';

describe('NgCanComponent', () => {
  let component: NgCanComponent;
  let fixture: ComponentFixture<NgCanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
