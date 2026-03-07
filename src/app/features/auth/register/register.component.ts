import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RegisterRequest } from '@features/auth/models/login-request.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerRequest = signal<RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  loading = signal(false);
  errorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.registerRequest()).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.isSuccess) {
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        } else {
          this.errorMessage.set(response.message || 'Registration failed. Please try again.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Registration failed. Please try again.');
      },
    });
  }
}
