import { Component, OnInit, inject, signal } from '@angular/core';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { HeaderComponent } from '@layout/header/header.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { NavigationEnd, NavigationCancel, NavigationError, RouterOutlet, NavigationStart, Router } from '@angular/router';
import { Loading } from '@app/core/services/loading.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  sidebarCollapsed = signal(false);
  loadingService = inject(Loading); 
  router = inject(Router);  
  collapseSidebar(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);


    
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
  } 
}
