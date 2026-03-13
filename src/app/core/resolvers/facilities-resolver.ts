import { ResolveFn } from '@angular/router';
import { delay, of } from 'rxjs';
import { FacilityService } from '../services/facility.service';
import { inject } from '@angular/core';
import { BackEndResponse } from '@app/features/auth/models/login-request.model';
import { FacilityViewDto } from '@app/features/facilities/Models/facilityDto';

export const facilitiesResolver: ResolveFn<BackEndResponse<FacilityViewDto[]>> = (route, state) => {

  var facilityService = inject(FacilityService);

  return facilityService.getAllFacilities();
};
