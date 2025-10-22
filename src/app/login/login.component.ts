import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/service'; // ✅ correct path

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService); // ✅ inject UserService

  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public isLoginMode = true;

  constructor() {
    this.loginForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      currentWeight: [''],
      targetWeight: [''],
      age: [''],
      height: [''],
    });

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(): void {
    const form = this.isLoginMode ? this.loginForm : this.signupForm;
    if (!form.valid) return;

    const endpoint = this.isLoginMode
      ? 'http://localhost:4000/api/users/register'
      : 'http://localhost:4000/api/users/login';

    this.http.post(endpoint, form.value).subscribe({
      next: (res: any) => {
        console.log('✅ Response:', res);
        console.log("user",res.user);
        console.log("type",typeof res.user);
        console.log("after converting string",JSON.stringify(res.user));
       function saveToLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
}

// Usage:
saveToLocalStorage('user', res.user);
saveToLocalStorage('token', res.token);
// ✅ Correct
        this.userService.setUser(res.user); // ✅ store user data globally
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Auth error:', err.error.message);
        alert(err.error.message);
      },
    });
  }
}
