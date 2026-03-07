import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ForgotPasswordRequest } from '@features/auth/models/login-request.model';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  request = signal<ForgotPasswordRequest>({ email: '' });
  loading = signal(false);
  submitted = signal(false);
  errorMessage = signal('');

  constructor(private authService: AuthService) {}

  submit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.forgotPassword(this.request()).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Something went wrong. Please try again.');
      },
    });
  }
}
