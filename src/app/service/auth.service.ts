import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario != null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }


  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token != null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

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

  guardarUsuario(access_token: string): any {
    let payload = this.obtenerDatosToken(access_token);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(access_token: string): any {
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(access_token: string): any {
    if (access_token != null) {
      return JSON.parse(atob(access_token.split(".")[1]));
    }
    return null;
  }
}
