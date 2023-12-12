import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.page.html',
  styleUrls: ['./repository.page.scss'],
})
export class RepositoryPage implements OnInit {

  repositories = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('https://api.github.com/users/dizkm8/repos')
    .subscribe(res => {
      console.log(res);
      this.repositories = res;
    });
  }

}
