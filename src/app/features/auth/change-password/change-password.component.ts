import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ChangePasswordRequest } from '@features/auth/models/login-request.model';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  request = signal<ChangePasswordRequest>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  submit(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.changePassword(this.request()).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.isSuccess) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage.set(response.message || 'Password change failed.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Password change failed. Please try again.');
      },
    });
  }
}
