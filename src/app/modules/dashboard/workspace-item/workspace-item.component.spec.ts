import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceItemComponent } from './workspace-item.component';

describe('WorkspaceItemComponent', () => {
  let component: WorkspaceItemComponent;
  let fixture: ComponentFixture<WorkspaceItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceItemComponent]
    });
    fixture = TestBed.createComponent(WorkspaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
