import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  form:FormGroup;

  constructor(public formBuilder: FormBuilder, private ApiService:ApiService, private router: Router)
  {
    this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]});
  }

  async onSubmit() {
    try {
      const message = await this.ApiService.login(this.form.value);
      console.log(message);
      localStorage.setItem('token', message.token);
      this.router.navigate(['/menu']);

  } catch (error: any) {
      console.error('Credenciales inválidas.', error);
    }
  }

  ngOnInit(){

  }

}
