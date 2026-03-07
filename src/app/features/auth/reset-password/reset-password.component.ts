import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ResetPasswordRequest } from '@features/auth/models/login-request.model';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  request = signal<ResetPasswordRequest>({
    email: '',
    token: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  loading = signal(false);
  errorMessage = signal('');
  invalidLink = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.queryParams['email'] ?? '';
    const token = this.route.snapshot.queryParams['token'] ?? '';

    if (!email || !token) {
      this.invalidLink.set(true);
      return;
    }

    this.request.update(r => ({ ...r, email, token }));
  }

  submit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.resetPassword(this.request()).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.isSuccess) {
          this.router.navigate(['/login'], { queryParams: { passwordReset: 'true' } });
        } else {
          this.errorMessage.set(response.message || 'Reset failed. The link may have expired.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Reset failed. The link may have expired.');
      },
    });
  }
}
