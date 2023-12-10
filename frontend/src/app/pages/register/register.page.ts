import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
