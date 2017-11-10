import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonPlaceholderDemoComponent } from './json-placeholder-demo.component';

describe('JsonPlaceholderDemoComponent', () => {
  let component: JsonPlaceholderDemoComponent;
  let fixture: ComponentFixture<JsonPlaceholderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonPlaceholderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonPlaceholderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
