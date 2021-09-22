import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../model/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private urlBase = "http://localhost:9898/api/usuarios";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token)
    }
    return this.httpHeaders;
  }

  private noAutorizado(e): boolean {
    if (e.status == 401) {
      this.router.navigate(['/login']);
      return true;
    } else if (e.status = 403) {
      Swal.fire(
        'Acceso denegado',
        'Usted no cuenta con permisos para acceder a este recurso',
        'error'
      );
      this.router.navigate(['/clientes']);
      return true;
    } else {
      return false;
    }
  }

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get(this.urlBase)
      .pipe(map(response => response['usuarios']));
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlBase}/${id}`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (this.noAutorizado(e)) {
            return throwError(e);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlBase, cliente, { headers: this.httpHeaders })
      .pipe(map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if (this.noAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e);
        })
      );
  }

  eliminarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlBase}/eliminar/${id}`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (this.noAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e);
          this.router.navigate(['/login']);
          console.error(e.error.error_description);
        })
      );
  }
}
