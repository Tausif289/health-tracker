import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  public loginForm: FormGroup;
  public isLoginMode = true;

  constructor() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  public toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }
}
