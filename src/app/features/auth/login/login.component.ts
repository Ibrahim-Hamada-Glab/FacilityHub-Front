import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginRequest } from '@features/auth/models/login-request.model';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginRequest = signal<LoginRequest>({ email: '', password: '' });
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const registered = this.route.snapshot.queryParams['registered'];
    const passwordReset = this.route.snapshot.queryParams['passwordReset'];
    if (registered === 'true') {
      this.successMessage.set('Account created! Please check your email to verify your address, then sign in.');
    } else if (passwordReset === 'true') {
      this.successMessage.set('Password reset successfully. You can now sign in with your new password.');
    }
  }

  login(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginRequest()).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.isSuccess) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage.set(response.message || 'Login failed. Please check your credentials.');
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(
          error?.error?.message || 'Login failed. Please check your credentials and try again.'
        );
      },
    });
  }
}
