import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

/**
 * Componente para la página de registro de usuarios.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  /** Almacena el año actual. */
  currentYear: number = new Date().getFullYear();

  /** FormGroup que define el formulario de registro. */
  form: FormGroup;

  /** Indicador para mostrar la tarjeta de éxito al iniciar sesión. */
  showSuccess: boolean = false;
  successMessage: string ='';

  /**
   * Constructor del componente RegisterPage.
   * @param formBuilder Instancia de FormBuilder para la creación de formularios.
   * @param ApiService Servicio para las llamadas a la API de registro.
   * @param router Instancia de Router para la navegación dentro de la aplicación.
   */
  constructor(
    public formBuilder: FormBuilder,
    private ApiService: ApiService,
    private router: Router
  ) {
    // Inicialización del FormGroup con validaciones para los campos del formulario
    this.form = this.formBuilder.group({
      rut: ['', [Validators.required]], // Campo para el RUT (Requerido)
      full_name: ['', [Validators.required]], // Campo para el nombre completo (Requerido)
      email: ['', [Validators.required, Validators.email]], // Campo para el correo electrónico (Requerido y formato de correo válido)
      year: ['', [Validators.required]], // Campo para el año (Requerido)
    });
  }

  /**
   * Función invocada al enviar el formulario de registro.
   * Realiza el registro del usuario y gestiona los posibles errores.
   */
  async onSubmit() {
    try {
      // Llamada a la API para registrar los datos proporcionados en el formulario
      const response = await this.ApiService.register(this.form.value);
      const success = response.success;
      if(success){
        // Almacenar el token devuelto por la API en el almacenamiento local
        localStorage.setItem('token', response.token);
        // Reiniciar el formulario después del registro exitoso
        this.form.reset();
        this.showSuccess= true;
        this.successMessage = success;
        // Temporizador para redirigir a otra vista después de 3 segundos (3000 ms)
        setTimeout(() => {
          this.router.navigate(['/menu']); // Cambiar a la vista del menú después del tiempo especificado
        }, 1500);

      }

    } catch (error: any) {
      // Manejo de errores en caso de fallo en el registro

      // Verificar si hay un error general devuelto por la API y establecerlo en el formulario
      if (error.error) {
        const serverError = error.error.error;
        this.form.setErrors({ serverError: serverError });
      }

      // Verificar si hay errores específicos para campos individuales y establecerlos en el formulario
      if (error.error?.errors) {
        const errorObject = error.error.errors;
        Object.keys(errorObject).forEach((fieldName) => {
          const formControl = this.form.get(fieldName);
          if (formControl) {
            formControl.setErrors({ serverError: errorObject[fieldName][0] });
          }
        });
      }
    }
  }

  //Te redirige hacia la página principal
  goHome(){
    this.router.navigate(['/home']);
  }
}
