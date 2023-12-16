import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  getToken() {
    // Lógica para obtener el token
  }
}
