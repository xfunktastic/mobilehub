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
      console.log(message);
      localStorage.setItem('token', message.token);
      this.router.navigate(['/menu']);
    } catch (error:any) {
      console.error('Credenciales inválidas.', error);
    }
  }

  ngOnInit() {
  }

}
