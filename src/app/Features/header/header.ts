import { Component, output, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  collapsed = signal(false);

  output =  output<boolean>();

  toggleSidebar() {
    this.collapsed.set(!this.collapsed());
    this.output.emit(this.collapsed());
  }

}
