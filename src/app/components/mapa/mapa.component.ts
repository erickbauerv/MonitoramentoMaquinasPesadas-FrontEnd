import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';

// Configuração dos ícones
const iconDefault = L.icon({
  iconUrl: 'https://img.notionusercontent.com/s3/prod-files-secure%2F724cd7f4-29c5-4a23-96a3-133b93a401a9%2F73cf2945-9bc7-4db7-8877-9bf8097cbd45%2Fimage.png/size/w=2000?exp=1753829995&sig=9OP5mBqXGLkKyIxK8BVGNpZ4B_Di-7Ss--arQ4Uizes&id=23fd83f6-fecf-8073-b9ad-e9d885d817f5&table=block&userId=90e2ec9b-fc28-418e-9f04-20c8406e75ee',
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
          const markers = L.marker(coords, { icon: iconDefault }).addTo(this.map).bindPopup(`<b>${maquina.nome}</b><br>Status: ${maquina.status}`);
        }
      }
    })
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
