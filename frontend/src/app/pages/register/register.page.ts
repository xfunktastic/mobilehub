import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  //Obtener año actual
  currentYear: number = new Date().getFullYear();
  //Crear form group
  form:FormGroup;

  constructor(public formBuilder: FormBuilder, private ApiService:ApiService, private router: Router)
  {
    this.form = this.formBuilder.group({
      rut: ['', [Validators.required]],
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      year: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    try {
      const message = await this.ApiService.register(this.form.value);
      localStorage.setItem('token', message.token);
      this.form.reset();
      this.router.navigate(['/menu']);
    } catch (error:any) {
      // Setear el error general en el formulario
      if (error.error) {
        // Manejar errores generales del servidor
        const serverError = error.error.error;
        this.form.setErrors({ serverError: serverError });
      }
      if (error.error?.errors) {
        const errorObject = error.error.errors;
        // Iterar sobre las claves del objeto de errores
        Object.keys(errorObject).forEach((fieldName) => {
          const formControl = this.form.get(fieldName);
          // Verificar si el campo existe en el formulario
          if (formControl) {
            formControl.setErrors({ serverError: errorObject[fieldName][0] });
          }
        });
      }
    }
  }
}
