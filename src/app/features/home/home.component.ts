import { Component, signal } from '@angular/core';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { HeaderComponent } from '@layout/header/header.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sidebarCollapsed = signal(false);

  collapseSidebar(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
  }
}
