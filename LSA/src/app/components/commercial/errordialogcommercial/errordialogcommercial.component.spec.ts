import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrordialogcommercialComponent } from './errordialogcommercial.component';

describe('ErrordialogcommercialComponent', () => {
  let component: ErrordialogcommercialComponent;
  let fixture: ComponentFixture<ErrordialogcommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrordialogcommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrordialogcommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
