import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {

    const urlLogin = "http://localhost:9898/oauth/token";
    const credenciales = btoa("cliente1" + ":" + "cliente2021");
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    params.set('grant_type', 'password');

    return this.http.post(urlLogin, params.toString(), { headers: httpHeaders })
  }
}
