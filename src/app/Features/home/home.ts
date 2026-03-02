import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Dashboard } from "../dashboard/dashboard";
import { Header } from "../header/header";

@Component({
  selector: 'app-home',
  imports: [Sidebar, Dashboard, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
