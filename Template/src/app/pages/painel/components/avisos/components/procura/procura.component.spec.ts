/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProcuraComponent } from './procura.component';

describe('ProcuraComponent', () => {
  let component: ProcuraComponent;
  let fixture: ComponentFixture<ProcuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
