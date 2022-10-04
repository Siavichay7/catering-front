import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria.interface';
import { ServicioAdicional } from '../interfaces/servicio-adicional.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/clientes`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.API_URL}/categorias`);
  }

  getServiciosAdicionales(): Observable<ServicioAdicional[]> {
    return this.http.get<ServicioAdicional[]>(`${this.API_URL}/servicio-adicional`);
  }

}
