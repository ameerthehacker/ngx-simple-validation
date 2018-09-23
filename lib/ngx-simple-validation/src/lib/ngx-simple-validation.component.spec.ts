import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSimpleValidationComponent } from './ngx-simple-validation.component';

describe('NgxSimpleValidationComponent', () => {
  let component: NgxSimpleValidationComponent;
  let fixture: ComponentFixture<NgxSimpleValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSimpleValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSimpleValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
