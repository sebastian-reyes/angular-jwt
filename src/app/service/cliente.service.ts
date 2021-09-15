import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlBase = "http://localhost:9898/api/usuarios";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get(this.urlBase)
      .pipe(map(response => response['usuarios'])); 
  }
}
