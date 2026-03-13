import { Component, inject, Input } from '@angular/core';
import { FacilityStatus, FacilityType, FacilityViewDto } from '../Models/facilityDto';
import { FacilityService } from '@app/core/services/facility.service';

@Component({
  selector: 'app-facilitiy-card',
  imports: [],
  templateUrl: './facilitiy-card.html',
  styleUrl: './facilitiy-card.css',
})
export class FacilitiyCard {
  @Input() facility!: FacilityViewDto;

  facilityService = inject(FacilityService);

 
  
}
