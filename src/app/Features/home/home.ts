import { Component, signal } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Dashboard } from "../dashboard/dashboard";
import { Header } from "../header/header";

@Component({
  selector: 'app-home',
  imports: [Sidebar, Dashboard, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  siderbarCollapsed = signal(false);

  collapseSidebar(collapsed: boolean) {
   
    this.siderbarCollapsed.set(collapsed);


    // const h1SidebarElements = document.querySelectorAll('app-sidebar span');
    // const h1sidebarElement = document.querySelector('app-sidebar header h1');
    // const appsidebarElement = document.querySelector('app-sidebar');
    // console.log(h1SidebarElements);
    //    if (collapsed) {
    //     if (appsidebarElement) {
    //       (appsidebarElement as HTMLElement).classList.remove('flex-1');
    //     }
    //     h1SidebarElements.forEach(el => (el as HTMLElement).classList.add('collapse'));
    //     if (h1sidebarElement) {
    //       (h1sidebarElement as HTMLElement).classList.add('collapse');
    //     }
    //     } else {
    //     h1SidebarElements.forEach(el => (el as HTMLElement).classList.remove('collapse'));
    //     if (h1sidebarElement) {
    //       (h1sidebarElement as HTMLElement).classList.remove('collapse');
    //     }
    //      if (appsidebarElement) {
    //       (appsidebarElement as HTMLElement).classList.add('flex-1');
    //     }
    //   }
     
  }
}
