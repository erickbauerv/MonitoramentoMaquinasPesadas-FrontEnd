import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from '../../shared/models/maquina.model';
import { MaquinaUpdateDto } from '../../shared/dto/maquinaUpdate.dto';
import { MaquinaCreateDto } from '../../shared/dto/maquinaCreate.dto';

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

  getMaquina(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${this.apiUrl}/${id}`);
  }

  createMaquina(maquinaCreateDto: MaquinaCreateDto) {
    return this.http.post(this.apiUrl, maquinaCreateDto);
  }

  updateMaquina(id: number, maquinaUpdateDto: MaquinaUpdateDto) {
    return this.http.put(`${this.apiUrl}/${id}`, maquinaUpdateDto);
  }
}
