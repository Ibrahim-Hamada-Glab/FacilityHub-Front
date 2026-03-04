import { Component, HostBinding, input } from '@angular/core';
import { RouterLink } from "@angular/router";

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  host:{'class.collapsed':'collapsed'}
})
export class Sidebar {
  collapsed = input(false);

    @HostBinding('class.collapsed')
  get isCollapsed() {
    return this.collapsed();
  }
}
