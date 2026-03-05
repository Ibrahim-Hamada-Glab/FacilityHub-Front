import { HttpClient } from '@angular/common/http';
import { signal, computed, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { BackEndResponse, LoginRequest, LoginResponse, User } from '@app/features/auth/models/login-request.model';
import { environment } from '../config/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // 1. Define your private Signal (the "Source of Truth")
  private userSignal = signal<User | null>(null);

  // 2. Expose read-only versions for your components
  public readonly currentUser = this.userSignal.asReadonly();
  
  // 3. Create a derived Signal (automatically updates when userSignal changes)
  public readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  checkAuth(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (!token) return of(false);

    // If signal already has data, we are good!
    if (this.userSignal()) return of(true);

    return this.httpClient.get<BackEndResponse<User>>(`${environment.apiUrl}/auth/me`).pipe(
      tap(response => this.userSignal.set(response.data)), // Update the signal
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  login(params: LoginRequest): Observable<BackEndResponse<LoginResponse>> {
    return this.httpClient.post<BackEndResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, params).pipe(
      tap(response => {
        if (response?.data?.accessToken) {
          this.tokenService.setToken(response.data.accessToken);
          this.userSignal.set(response.data.user); // Update signal
        }
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userSignal.set(null); // Clear signal
  }
}