import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = 'http://127.0.0.1:8000/api';
  private reposUrl:string = 'https://api.github.com/users/dizkm8/repos';

  constructor(private http:HttpClient, private router:Router){}

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
  getRepositories(){
    return this.http.get(this.reposUrl);
  }

  //Visualizar commits del repositorio
  getCommits(){
    return this.http.get(this.reposUrl);
  }

  //Editar Usuario
  editUser(formValue: any){
    const token=this.getToken();
    if(token){
      const headers = new HttpHeaders().set('Authorization', 'bearer'+token)
      return this.http.patch<any>(this.url+'/profile/edit', formValue, {headers});
    } else{
      console.log('Token no encontrado');
      return new Observable();
      }
  }

  //Actualizar contraseña
  changePassword(formValue: any){
    const token=this.getToken();
    if(token){
      const headers = new HttpHeaders().set('Authorization', 'bearer'+token)
      return this.http.patch<any>(this.url+'/update-password', formValue, {headers});
    } else{
      console.log('Token no encontrado');
      return new Observable();
      }
  }

}
