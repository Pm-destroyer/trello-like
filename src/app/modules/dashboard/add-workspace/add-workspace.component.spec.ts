import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkspaceComponent } from './add-workspace.component';

describe('AddWorkspaceComponent', () => {
  let component: AddWorkspaceComponent;
  let fixture: ComponentFixture<AddWorkspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWorkspaceComponent]
    });
    fixture = TestBed.createComponent(AddWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
