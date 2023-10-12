import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  componentWidth!: number;
  matginLeft!: number;

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarWidth$.subscribe((width) => {
      this.componentWidth = this.sidebarService.calcWidth(width);
      this.matginLeft = width;

      this.cdr.detectChanges();
    });
  }
}
