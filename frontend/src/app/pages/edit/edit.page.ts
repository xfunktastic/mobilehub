import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  form: FormGroup;
  showSuccess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  ngOnInit()
  {
    this.editProfile();
  }

  editProfile() {
    this.apiService.editProfile().subscribe(
      (data: any) => {
        const userData = data.user; // Obtiene los datos del usuario
        this.form.patchValue(userData); // Llena el formulario con los datos del usuario
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }
}
