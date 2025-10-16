import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  public profileForm: FormGroup;
  public user = signal({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: 'https://randomuser.me/api/portraits/men/75.jpg',
  });

  constructor() {
    const currentUser = this.user();
    this.profileForm = this.fb.group({
      displayName: [currentUser?.displayName || ''],
      email: [{ value: currentUser?.email || '', disabled: true }],
      photoURL: [currentUser?.photoURL || ''],
    });
  }

  public updateProfile(): void {
    if (this.profileForm.valid) {
      const { displayName, photoURL } = this.profileForm.value;
      this.user.set({ ...this.user(), displayName, photoURL });
      alert('Profile updated successfully!');
    }
  }

  public signOut(): void {
    this.router.navigate(['/login']);
  }
}
