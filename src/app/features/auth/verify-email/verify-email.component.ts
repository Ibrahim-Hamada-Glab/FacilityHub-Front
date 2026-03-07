import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

type VerifyStatus = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  status = signal<VerifyStatus>('loading');
  errorMessage = signal('');

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['userId'] ?? '';
    const token = this.route.snapshot.queryParams['token'] ?? '';

    if (!userId || !token) {
      this.status.set('error');
      this.errorMessage.set('Invalid verification link.');
      return;
    }

    this.authService.verifyEmail({ userId, token }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.status.set('success');
        } else {
          this.status.set('error');
          this.errorMessage.set(response.message || 'Verification failed.');
        }
      },
      error: () => {
        this.status.set('error');
        this.errorMessage.set('Verification failed. The link may be invalid or expired.');
      },
    });
  }
}
