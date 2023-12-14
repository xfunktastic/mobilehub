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
  showSuccess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private ApiService:ApiService,
    private router: Router)
  {
    this.form = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  editProfile() {
    const formValue = this.form.value;
    this.ApiService.editProfile(formValue).subscribe(
      (response) => {
        const success = response;
        if (success) {
          this.form.reset();
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/menu']);
            this.showSuccess = false;
          }, 1500);
        }
      },
      (error) => {
        if (error.error && error.error.error) {
          const serverError = error.error.error;
          this.form.setErrors({ serverError }); // Set general server error in the form
          console.log('General Server Error:', serverError); // Log the general server error message
        } else if (error.error && error.error.errors) {
          const fieldName = error.error.errors;
          for (const field in fieldName) {
            if (fieldName.hasOwnProperty(field)) {
              const formControl = this.form.get(field);
              if (formControl) {
                formControl.setErrors({ serverError: fieldName[field][0] }); // Set specific field errors in the form
                console.log(`Field '${field}' Error:`, fieldName[field][0]); // Log specific field error message
              }
            }
          }
        }
      }
    );
  }


  ngOnInit() {
  }

}
