import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileComponent2 {
  public user: any = null;
  public editMode = false;
  public profileForm!: FormGroup;
  public defaultImage = 'assets/baby.jpg';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // ✅ Load user data directly from localStorage
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user);
      this.initForm(this.user);
    } else {
      // fallback (in case localStorage is empty)
      const demoUser = {
        name: 'Guest User',
        email: 'guest@example.com',
        age: 25,
        height: 170,
        currentWeight: 70,
        targetWeight: 65,
        photoURL: '',
      };
      this.user = demoUser;
      localStorage.setItem('user', JSON.stringify(demoUser));
      this.initForm(demoUser);
    }
  }

  initForm(userData: any) {
    this.profileForm = this.fb.group({
      name: [userData.name],
      email: [userData.email],
      age: [userData.age],
      height: [userData.height],
      currentWeight: [userData.currentWeight],
      targetWeight: [userData.targetWeight],
      photoURL: [userData.photoURL || ''],
    });
  }

  toggleEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.profileForm.patchValue(this.user);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileForm.patchValue({ photoURL: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  signOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // optional
    console.log('✅ User signed out');
    window.location.href = '/login';
  }

  updateProfile() {
    if (this.profileForm.invalid) return;

    const formData = new FormData();

    // Append form fields except photoURL
    Object.entries(this.profileForm.value).forEach(([key, value]) => {
      if (key !== 'photoURL' && value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Append image file if selected
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append('photo', fileInput.files[0]);
    }

    fetch(`http://localhost:4000/api/users/update-profile/${this.user._id}`, {
      method: 'PUT',
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update profile');

        if (data.success) {
          this.user = data.user;
          localStorage.setItem('user', JSON.stringify(data.user));
          this.editMode = false;
          console.log('✅ Profile updated:', data.user);
        } else {
          alert('Update failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch((err) => {
        console.error('❌ Error updating profile:', err);
        alert('Error updating profile: ' + err.message);
      });
  }
}
