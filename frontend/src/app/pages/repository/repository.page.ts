import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.page.html',
  styleUrls: ['./repository.page.scss'],
})
export class RepositoryPage implements OnInit {

  repositories: any[] = [];

  constructor(private ApiService:ApiService) { }

  ngOnInit() {
    this.ApiService.getRepositories().subscribe(
      (data: any) => (this.repositories = data)
    );
  }
}
