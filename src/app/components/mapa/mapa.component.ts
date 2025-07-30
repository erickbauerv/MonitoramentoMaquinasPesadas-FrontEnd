import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';

// Configuração dos ícones
const iconDefault = L.icon({
  iconUrl: 'https://img.icons8.com/?size=100&id=13800&format=png&color=000000',
  iconSize: [30, 30], 
  iconAnchor: [15, 30],
  popupAnchor: [0, -30] 
});

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;
  maquinas: Maquina[] = [];

  constructor( private maquinaService: MaquinaService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.carregarMaquinas();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-15.7889, -47.8792], 13);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private carregarMaquinas(): void {
    this.maquinaService.getMaquinas().subscribe({
      next: (response: Maquina[]) => {
        this.maquinas = response;
        this.adicionarMarcadores();
      },
      error: (err) => {
        console.error('Erro ao carregar máquinas: ', err);
        this.maquinas = []
      }
    })
  }

  private adicionarMarcadores(): void {
    this.maquinas.forEach(maquina => {
      if(maquina.localizacao) {
        const coords = this.parseCoordenadas(maquina.localizacao);
        if(coords){
          L.marker(coords, { icon: iconDefault }).addTo(this.map).bindPopup(`<b>${maquina.nome}</b><br>Status: ${this.formatarStatus(maquina.status)}`);
        }
      }
    })
  }

  private formatarStatus(status: string): string {
    let statusFormatado: string = '';

    switch(status){
      case 'desligada': {
        statusFormatado = 'Desligada';
        break;
      }
      case 'manutencao': {
        statusFormatado = 'Em Manutenção';
        break;
      }
      case 'operando': {
        statusFormatado = 'Operando';
        break;
      }
    }

    return statusFormatado;
  }

  private parseCoordenadas(localizacao: string): L.LatLngExpression | null {
    try{
      const [latStr, lngStr] = localizacao.split(',').map(s => s.trim());
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if(isNaN(lat) || isNaN(lng)) {
        console.error('Coordenadas inválidas: ', localizacao);
        return null;
      }

      return [lat, lng];
    } catch (error) {
      console.error('Erro ao parsear coordenadas: ', error);
      return null;
    }
  }
}
