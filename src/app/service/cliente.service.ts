import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../model/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlBase = "http://localhost:9898/api/usuarios";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private noAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    } else {
      return false;
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get(this.urlBase)
      .pipe(map(response => response['usuarios']));
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlBase}/${id}`)
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
          console.error
        })
      );
  }
}
