import { Component, signal , } from '@angular/core';
import { LoginRequest } from '../Models/loginRequest';
import { AuthService } from '../../../core/authService';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: AuthService , private router:Router) {}
  public loginRequest  = signal<LoginRequest>({
    email: '',
    password: '',
  });

  login(){
    this.authService.login(this.loginRequest()).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
        // Handle login error, e.g., show error message to user
      }
    });
  }
}
