import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {

  form: FormGroup;
  showSuccess: boolean = false;
  successMessage: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  updatePassword() {
    const formValue = this.form.value;
    this.apiService.updatePassword(formValue).subscribe(
      (response: any) => {
        const successMessage = response.success; // Verifica la estructura de la respuesta y extrae el mensaje de éxito
        if (successMessage) {
          this.form.reset();
          this.showSuccess = true;
          this.successMessage = successMessage; // Almacena el mensaje de éxito para mostrarlo en HTML
          setTimeout(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            this.showSuccess = false;
          }, 1500);
        }
      },
      (error) => {
        if (error.error && error.error.error) {
          const serverError = error.error.error;
          this.form.setErrors({ serverError });
        } else if (error.error && error.error.errors) {
          const fieldName = error.error.errors;
          for (const field in fieldName) {
            if (fieldName.hasOwnProperty(field)) {
              const formControl = this.form.get(field);
              if (formControl) {
                formControl.setErrors({ serverError: fieldName[field][0] });
              }
            }
          }
        }
      }
    );
  }
}
