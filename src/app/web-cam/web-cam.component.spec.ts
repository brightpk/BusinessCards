/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebCamComponent } from './web-cam.component';

describe('WebCamComponent', () => {
  let component: WebCamComponent;
  let fixture: ComponentFixture<WebCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
