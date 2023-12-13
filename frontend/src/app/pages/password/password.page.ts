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

  formValue: any = {
    // inicializa formValue con los valores del formulario
    password: '',
    new_password: '',
    confirm_password: ''
  };

  showSuccess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private ApiService:ApiService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  async updatePassword() {
    try {
      const formValue = this.form.value;
      console.log('Valores del formulario:', formValue);
      await this.ApiService.updatePassword(formValue);
      console.log('Contraseña actualizada con éxito');
      this.form.reset();
      this.router.navigate(['/menu']);
    } catch (error:any) {
      console.error('Error al actualizar la contraseña', error);
      // Handle the error, for example, displaying a message to the user
    }
  }

  ngOnInit() {
  }

}
