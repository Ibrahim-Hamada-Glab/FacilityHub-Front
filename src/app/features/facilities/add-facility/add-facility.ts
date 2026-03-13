import { Component, signal } from '@angular/core';
import { FormsModule , ReactiveFormsModule , Validators , FormGroup , FormBuilder, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateFacility } from '../Models/create-facility';
// Mat Error 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FacilityService } from '@app/core/services/facility.service';


 
@Component({
  selector: 'app-add-facility',
  imports: [FormsModule, RouterLink , ReactiveFormsModule , MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './add-facility.html',
  styleUrl: './add-facility.css',
})
export class AddFacility {

  facilityForm : FormGroup;
  facility = signal<CreateFacility>({
    name: '',
    address: '',
    city: '',
    type: 1,
    totalFloors: 1,
    totalArea: 0,
    status: 1,
    imageUrl: '',
  });

  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  facilityTypes = [
    { value: 1, label: 'Office' },
    { value: 2, label: 'Factory' },
    { value: 3, label: 'Warehouse' },
    { value: 4, label: 'School' },
    { value: 5, label: 'Hospital' },
    { value: 6, label: 'Hotel' },
    { value: 7, label: 'Restaurant' },
    { value: 8, label: 'Other' },
  ];

  facilityStatuses = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' },
    { value: 3, label: 'Under Maintenance' },
  ];

constructor(private router: Router, formBuilder: FormBuilder , private facilityService: FacilityService ) {
  this.facilityForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(256)],
      updateOn: 'blur'
    }),
    
    address: new FormControl('',{
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(256)],
      updateOn: 'blur'
    }),
    
    city: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
      updateOn: 'blur'
    }),
    
    // Even for single validators, use [ ] to separate it from the options object
    type: new FormControl(1, {
      validators:[Validators.required],
      updateOn: 'blur'
    }),
    
    status: new FormControl(1, {
      validators: [Validators.required],
      updateOn: 'blur'
    }),
    
    totalFloors: new FormControl(1, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: 'blur'
    }),
    
    totalArea: new FormControl(1, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: 'blur'
    }),
    
    imageUrl: new FormControl('', {
      validators: [Validators.maxLength(512)],
      updateOn: 'blur'
    }) // No updateOn here, so 2 arguments is fine
  });
}
  submit(): void {
    this.loading.set(true);
      if (this.facilityForm.invalid) {
        this.facilityForm.markAllAsTouched();
        this.loading.set(false);
        this.errorMessage.set(this.facilityForm.errors?.['required'] ? 'This field is required' : '');

        return;
      }
      this.facilityService.createFacility({
        name: this.facilityForm.value.name,
        address: this.facilityForm.value.address,
        city: this.facilityForm.value.city,
        type: this.facilityForm.value.type,
        totalFloors: this.facilityForm.value.totalFloors,
        totalArea: this.facilityForm.value.totalArea,
        status: this.facilityForm.value.status,
        imageUrl: this.facilityForm.value.imageUrl,
      }).subscribe({
        next: () => {
          this.loading.set(false);
          this.successMessage.set('Facility created successfully');
          this.facilityForm.reset();
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error.error?.message || 'An error occurred while creating the facility');
        }
      });


}
}
