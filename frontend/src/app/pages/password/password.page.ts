import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {

  form:FormGroup;
  showSuccess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private ApiService:ApiService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  updatePassword() {
    const formValue = this.form.value;
    this.ApiService.updatePassword(formValue).subscribe(
      (response) => {
        const success = response;
        if (success) {
          this.form.reset();
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/menu']);
            this.showSuccess = false;
          }, 1500);
        }
      },
      (error) => {
        if (error.error && error.error.error) {
          // Handle general errors if necessary
          const serverError = error.error.error;
          this.form.setErrors({ serverError }); // Set general server error in the form
        } else if (error.error && error.error.errors) {
          const fieldName = error.error.errors;
          for (const field in fieldName) {
            if (fieldName.hasOwnProperty(field)) {
              // Handle specific field errors
              const formControl = this.form.get(field);
              if (formControl) {
                formControl.setErrors({ serverError: fieldName[field][0] }); // Set specific field errors in the form
              }
            }
          }
        }
      }
    );
  }
}
