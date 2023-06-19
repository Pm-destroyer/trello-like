import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLoginComponent } from './facebook-login.component';

describe('FacebookLoginComponent', () => {
  let component: FacebookLoginComponent;
  let fixture: ComponentFixture<FacebookLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacebookLoginComponent]
    });
    fixture = TestBed.createComponent(FacebookLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
