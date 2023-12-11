import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = 'http://127.0.0.1:8000/api';

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

}
