/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PluginChartComponent } from './plugin-chart.component';

describe('PluginChartComponent', () => {
  let component: PluginChartComponent;
  let fixture: ComponentFixture<PluginChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
