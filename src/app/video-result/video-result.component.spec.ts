/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideoResultComponent } from './video-result.component';

describe('VideoResultComponent', () => {
  let component: VideoResultComponent;
  let fixture: ComponentFixture<VideoResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
