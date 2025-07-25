import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from '../../shared/models/maquina.model';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  private apiUrl = 'http://localhost:3000/maquinas';

  constructor(
    private http: HttpClient
  ) { }

  getMaquinas(status?: string): Observable<Maquina[]> {
    const urlFiltro = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<Maquina[]>(urlFiltro);
  }
}
