import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.page.html',
  styleUrls: ['./repository.page.scss'],
})
export class RepositoryPage implements OnInit {

  repositories: any[] = [];

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.getRepositories().subscribe((repos: any[]) => {
      this.repositories = repos;
      // Obtener el número de commits para cada repositorio
      this.repositories.forEach(repo => {
        this.ApiService.getCommits(repo.name).subscribe((commits: any[]) => {
          repo.commits = commits;
          repo.commitCount = commits.length; // Asignar el número de commits al repositorio
        });
      });
    });
  }

  toggleCommits(repo: any): void {
    if (!repo.showCommits) {
      this.ApiService.getCommits(repo.name).subscribe((commits: any[]) => {
        repo.commits = commits;
        repo.showCommits = true;
      });
    } else {
      repo.showCommits = false;
    }
  }
}

