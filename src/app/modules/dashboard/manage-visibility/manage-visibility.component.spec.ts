import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVisibilityComponent } from './manage-visibility.component';

describe('ManageVisibilityComponent', () => {
  let component: ManageVisibilityComponent;
  let fixture: ComponentFixture<ManageVisibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVisibilityComponent]
    });
    fixture = TestBed.createComponent(ManageVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
