import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

/**
 * El componente PasswordPage representa la página para actualizar contraseñas de usuario.
 */
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {

  // Grupo de formulario para el formulario de actualización de contraseña
  form: FormGroup;

  // Bandera para mostrar el mensaje de éxito
  showSuccess: boolean = false;

  // Mensaje de éxito que se mostrará
  successMessage: string = '';

  /**
   * Constructor para el componente PasswordPage.
   * @param formBuilder FormBuilder de Angular para crear grupos y controles de formulario.
   * @param apiService Servicio para realizar llamadas a la API relacionadas con actualizaciones de contraseña.
   * @param router Router de Angular para navegación.
   */
  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    // Inicialización del formulario y sus controles
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  /**
   * Método para actualizar la contraseña.
   */
  updatePassword() {
    const formValue = this.form.value;
    // Llamada al servicio de API para actualizar la contraseña
    this.apiService.updatePassword(formValue).subscribe(
      (response: any) => {
        const successMessage = response.success;
        if (successMessage) {
          // Manejo de éxito: reinicio del formulario, muestra de mensaje y redirección después de cierto tiempo
          this.form.reset();
          this.showSuccess = true;
          this.successMessage = successMessage;
          setTimeout(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            this.showSuccess = false;
          }, 1500);
        }
      },
      (error) => {
        // Manejo de errores: validación de errores del servidor o del formulario
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
