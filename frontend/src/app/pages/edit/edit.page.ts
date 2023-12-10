import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  form:FormGroup;

  constructor(public formBuilder: FormBuilder, private ApiService:ApiService, private router: Router)
  {
    this.form = this.formBuilder.group({
      rut: [],
      full_name: [],
      email: [],
      year: []
    });
  }

  async onSubmit() {
    try {
      const message = await this.ApiService.login(this.form.value);
      console.log(this.ApiService.edit(this.form.value));
      localStorage.setItem('token', message.token);
      this.router.navigate(['/edit']);
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
