import { Component, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FacilitiyCard } from './facilitiy-card/facilitiy-card';
import { FacilityService } from '@app/core/services/facility.service';
import { FacilityViewDto } from './Models/facilityDto';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
 @Component({
  selector: 'app-facilities',
  imports: [FacilitiyCard, RouterLink, MatProgressSpinner],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class Facilities implements OnInit {
  displayChoice = signal<'list' | 'grid'>('grid');

  
  
  constructor(public facilityService: FacilityService ,private activatedRoute: ActivatedRoute) {
    
  }
  ngOnInit(): void {
     this.facilityService.getAllFacilities().subscribe();
     console.log(this.facilityService.Facilities());
  }
}
