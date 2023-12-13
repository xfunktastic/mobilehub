import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

/**
 * Componente correspondiente a la página de inicio de sesión.
 * Permite a los usuarios iniciar sesión y gestionar la interacción con el formulario.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  /** Formulario reactivo para la autenticación de usuario. */
  form: FormGroup;

  /** Indicador para mostrar la tarjeta de éxito al iniciar sesión. */
  showSuccess: boolean = false;

  /**
   * Constructor del componente de inicio de sesión.
   * @param formBuilder Instancia de FormBuilder para construir el formulario reactivo.
   * @param ApiService Servicio para la interacción con la API de autenticación.
   * @param router Servicio de enrutamiento para redirigir a otras vistas.
   */
  constructor(
    public formBuilder: FormBuilder,
    private ApiService: ApiService,
    private router: Router
  ) {
    // Inicialización del formulario con controles para email y contraseña
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Método invocado al enviar el formulario de inicio de sesión.
   * Realiza la solicitud de inicio de sesión y gestiona las respuestas.
   */
  async onSubmit() {
    try {
      // Intenta autenticar utilizando los valores del formulario
      const response = await this.ApiService.login(this.form.value);
      const success = response.success;

      if (success) {
        // Almacenamiento del token de sesión tras un inicio de sesión exitoso
        localStorage.setItem('token', response.token);
        this.form.reset(); // Reiniciar el formulario
        this.showSuccess = true; // Mostrar tarjeta de éxito al iniciar sesión correctamente

        // Temporizador para redirigir a otra vista después de 3 segundos (3000 ms)
        setTimeout(() => {
          this.router.navigate(['/menu']); // Cambiar a la vista del menú después del tiempo especificado
          this.showSuccess = false;
        }, 1500);
      }
    } catch (error: any) {
      // Manejo de errores en caso de fallo en la solicitud de inicio de sesión
      if (error.error) {
        // Configuración del error general en el formulario
        const serverError = error.error.error;
        this.form.setErrors({ serverError: serverError }); // Configurar error general del servidor en el formulario
      }
      if (error.error.errors) {
        const errorObject = error.error.errors;
        // Iteración sobre las claves del objeto de errores
        Object.keys(errorObject).forEach((fieldName) => {
          const formControl = this.form.get(fieldName);
          // Verificación de la existencia del campo en el formulario
          if (formControl) {
            formControl.setErrors({ serverError: errorObject[fieldName][0] }); // Configurar errores específicos del campo en el formulario
          }
        });
      }
    }
  }
}
