import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacoesService {

  constructor() { }

  validarLocalizacao(localizacao: string): string {
    let erroLocalizacao = '';
    
    if (!localizacao) {
      erroLocalizacao = 'A localização da máquina é obrigatório';
      return erroLocalizacao;
    }

    const regex = /^-?\d{1,3}\.\d{1,20},\s*-?\d{1,3}\.\d{1,20}$/;
    
    if (!regex.test(localizacao)) {
      erroLocalizacao = 'Formato inválido. Use: -12.345678, -34.567890';
      return erroLocalizacao;
    }

    const [latStr, lngStr] = localizacao.split(',').map(s => s.trim());
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      let erroLocalizacao = 'Valores inválidos. Latitude (-90 a 90) e Longitude (-180 a 180)';
      return erroLocalizacao;
    }

    return erroLocalizacao;
  }

  validarNome(nome: string): string {
    let erroNome = '';
    
    if (!nome || !nome.trim()) {
      erroNome = 'O nome da máquina é obrigatório';
      return erroNome;
    }

    return erroNome;
  }
}
