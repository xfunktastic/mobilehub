import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //Obtener año actual
  currentYear: number = new Date().getFullYear();

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
      console.log(this.ApiService.register(this.form.value));
      localStorage.setItem('token', message.token);
      this.router.navigate(['/menu']);
    } catch (error:any) {
      if (error instanceof Error) {
        console.log('Error:', error.message);
      } else if (error.status === 400) {
        // Aquí puedes manejar errores de validación específicos del servidor
        console.log('Error de validación del servidor:', error.error);
      } else {
        console.log('Error desconocido:', error);
      }
    }
  }

  ngOnInit() {
  }

}
