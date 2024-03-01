/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PluginKeyComponent } from './plugin-key.component';

describe('PluginKeyComponent', () => {
  let component: PluginKeyComponent;
  let fixture: ComponentFixture<PluginKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
