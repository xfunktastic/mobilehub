import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  form:FormGroup;

  constructor(public formBuilder: FormBuilder, private ApiService:ApiService, private router: Router)
  {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      try {
        // Llama al método del servicio API para cambiar la contraseña usando PUT
        const response = await this.ApiService.changePassword(formData);
        // Maneja la respuesta exitosa, si es necesario
        console.log('Contraseña cambiada con éxito', response);
      } catch (error) {
        // Maneja el error, si es necesario
        console.error('Error al cambiar la contraseña', error);
      }
    }
  }

  ngOnInit() {
  }

}
