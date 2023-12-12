/**
 * Importaciones de módulos y servicios necesarios
 */
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

/**
 * Componente para la página de repositorios.
 */
@Component({
  selector: 'app-repository',
  templateUrl: './repository.page.html',
  styleUrls: ['./repository.page.scss'],
})
export class RepositoryPage implements OnInit {
  /** Arreglo para almacenar los repositorios */
  repositories: any[] = [];

  /**
   * Constructor que inyecta el servicio ApiService.
   * @param apiService - Instancia del servicio ApiService.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Método que se ejecuta al inicializarse el componente.
   * Obtiene los repositorios y los actualiza con los commits.
   */
  ngOnInit(): void {
    this.apiService.getRepositories().subscribe((repos: any[]) => {
      this.repositories = repos;
      this.updateReposWithCommits();
    });
  }

  /**
   * Actualiza los repositorios con los commits obtenidos.
   * Itera sobre cada repositorio, obtiene los commits y actualiza la información.
   */
  updateReposWithCommits(): void {
    this.repositories.forEach(repo => {
      this.apiService.getCommits(repo.name).subscribe((commits: any[]) => {
        repo.commits = commits;
        repo.commitCount = commits.length;
        const mostRecentCommit = this.findMostRecentCommit(commits);
        repo.updated_at = mostRecentCommit.commit.author.date;
        this.sortRepositoriesByDate();
      });
    });
  }

  /**
   * Encuentra el commit más reciente en un arreglo de commits.
   * @param commits - Arreglo de commits.
   * @returns El commit más reciente.
   */
  findMostRecentCommit(commits: any[]): any {
    return commits.reduce((prev, current) => {
      const prevDate = new Date(prev.commit.author.date).getTime();
      const currentDate = new Date(current.commit.author.date).getTime();
      return prevDate > currentDate ? prev : current;
    });
  }

  /**
   * Ordena los repositorios por fecha de actualización.
   */
  sortRepositoriesByDate(): void {
    this.repositories.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }

  /**
   * Alterna la visualización de los commits de un repositorio.
   * @param repo - Repositorio para mostrar/ocultar los commits.
   */
  toggleCommits(repo: any): void {
    if (!repo.showCommits) {
      this.apiService.getCommits(repo.name).subscribe((commits: any[]) => {
        repo.commits = commits;
        repo.showCommits = true;
      });
    } else {
      repo.showCommits = false;
    }
  }
}
