import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  collapsed = signal(false);
  output = output<boolean>();

  toggleSidebar(): void {
    this.collapsed.set(!this.collapsed());
    this.output.emit(this.collapsed());
  }
}
