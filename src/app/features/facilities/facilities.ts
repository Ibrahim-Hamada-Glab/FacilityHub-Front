import { Component, signal } from '@angular/core';
import { FacilitiyCard } from '../facilitiy-card/facilitiy-card';
import { FacilitiyRow } from "../facilitiy-row/facilitiy-row";
@Component({
  selector: 'app-facilities',
  imports: [FacilitiyCard, FacilitiyRow],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class Facilities {
  displayChoice = signal<'list' | 'grid'>('grid');
}
