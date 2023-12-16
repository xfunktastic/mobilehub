import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = 'http://127.0.0.1:8000/api';
  private gitUrl:string = 'https://api.github.com';

  constructor(private http:HttpClient, private router:Router){}

  //Obtener token
  getToken():string | null {
    return localStorage.getItem('token');
  }

  //Iniciar Sesión
  login(formValue:any){
    return firstValueFrom(this.http.post<any>(this.url+'/login',formValue));
  }

  //Registrar usuario
  register(formValue:any){
    return firstValueFrom(this.http.post<any>(this.url+'/register',formValue));
  }

  //Cerrar sesión
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  //Visualizar repositorios
  getRepositories(): Observable<any[]> {
    return this.http.get<any[]>(this.gitUrl + '/users/dizkm8/repos');
  }

  //Obtener commits de un repositorio en específico
  getCommits(repoName: string): Observable<any[]> {
    return this.http.get<any[]>(this.gitUrl + '/repos/dizkm8/' + repoName + '/commits');
  }

  //Editar perfil
  getUser(id: number) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'bearer' + token);
    return this.http.get<any>(this.url+/user/+`${id}`, { headers });
  }
  //Actualizar perfil
  updateUser(id: number, formValue: any) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'bearer' + token);
    return this.http.patch<any>(this.url+/user/+`${id}`, formValue, { headers });
  }

  //Actualizar contraseña
  updatePassword(formValue: any) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'bearer' + token);
    return this.http.patch(this.url + '/update-password', formValue, { headers });
  }

}
