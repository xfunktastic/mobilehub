// Importaciones de módulos y servicios necesarios
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.page.html',
  styleUrls: ['./repository.page.scss'],
})
export class RepositoryPage implements OnInit {
  // Arreglo para almacenar los repositorios
  repositories: any[] = [];

  // Constructor que inyecta el servicio ApiService
  constructor(private apiService: ApiService) {}

  // Método que se ejecuta al inicializarse el componente
  ngOnInit(): void {
    // Se llama al método del servicio para obtener los repositorios
    this.apiService.getRepositories().subscribe((repos: any[]) => {
      // Cuando se obtienen los repositorios, se almacenan y se actualizan con los commits
      this.repositories = repos;
      this.updateReposWithCommits();
    });
  }

  // Método para actualizar los repositorios con los commits
  updateReposWithCommits(): void {
    // Iterar sobre cada repositorio
    this.repositories.forEach(repo => {
      // Obtener los commits para cada repositorio
      this.apiService.getCommits(repo.name).subscribe((commits: any[]) => {
        // Asignar los commits al repositorio actual
        repo.commits = commits;
        repo.commitCount = commits.length;

        // Encontrar el commit más reciente y actualizar la fecha del repositorio
        const mostRecentCommit = this.findMostRecentCommit(commits);
        repo.updated_at = mostRecentCommit.commit.author.date;

        // Ordenar los repositorios por fecha
        this.sortRepositoriesByDate();
      });
    });
  }

  // Método para encontrar el commit más reciente en un arreglo de commits
  findMostRecentCommit(commits: any[]): any {
    return commits.reduce((prev, current) => {
      const prevDate = new Date(prev.commit.author.date).getTime();
      const currentDate = new Date(current.commit.author.date).getTime();
      return prevDate > currentDate ? prev : current;
    });
  }

  // Método para ordenar los repositorios por fecha de actualización
  sortRepositoriesByDate(): void {
    this.repositories.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }

  // Método para alternar la visualización de los commits de un repositorio
  toggleCommits(repo: any): void {
    if (!repo.showCommits) {
      // Si no se están mostrando los commits, se solicitan al servicio y se muestran
      this.apiService.getCommits(repo.name).subscribe((commits: any[]) => {
        repo.commits = commits;
        repo.showCommits = true;
      });
    } else {
      // Si ya se están mostrando los commits, se ocultan
      repo.showCommits = false;
    }
  }
}
