import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BackEndResponse } from '@app/features/auth/models/login-request.model';
import { CreateFacility } from '@app/features/facilities/Models/create-facility';
import { Observable, tap } from 'rxjs';
import { environment } from '../config/environment';
import { FacilityStatus, FacilityType, FacilityViewDto } from '@app/features/facilities/Models/facilityDto';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  private http = inject(HttpClient);


  public readonly FacilityTypes = FacilityType;
  public readonly FacilityStatus = FacilityStatus;

  private facilities = signal<FacilityViewDto[]>([]);

  public readonly Facilities = computed(() => this.facilities());


  public IsLoading = signal(false);

  createFacility(facility: CreateFacility): Observable<BackEndResponse<boolean>> {
    return this.http.post<BackEndResponse<boolean>>(`${environment.apiUrl}/Facility`, facility);
  }
  // getAll
  getAllFacilities(): Observable<BackEndResponse<FacilityViewDto[]>> {
    this.IsLoading.set(true);
    return this.http.get<BackEndResponse<FacilityViewDto[]>>(`${environment.apiUrl}/Facility`).pipe(
      tap({
        next: (response: BackEndResponse<FacilityViewDto[]>) => {

          console.log('Facilities fetched successfully:', response);
          this.facilities.set(response.data);
          this.IsLoading.set(false);
       
        },
        error: (error: any) => {
          console.error('Error fetching facilities:', error);
          this.IsLoading.set(false);
        },
      }),
    );
  }
}
