import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  form: FormGroup;
  showSuccess: boolean = false;
  successMessage: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  ngOnInit()
  {
    this.editProfile();
  }

  editProfile() {
    this.apiService.editProfile().subscribe(
      (data: any) => {
        const userData = data.user;
        this.form.patchValue(userData);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  updateProfile() {
    const formValue = this.form.value;

    this.apiService.updateProfile(formValue).subscribe(
      (response: any) => {
        if (response.success) {
          this.showSuccess = true;
          this.successMessage = response.success;
          setTimeout(() => {
            this.showSuccess = false;
          }, 1500);
        }
      },
      (error) => {
        if (error.status === 422) {
          console.log(error.error.errors);
        } else if (error.status === 500) {
          const serverError = error.error.error;
          this.form.setErrors({serverError});
        }
      }
    );
  }
}
