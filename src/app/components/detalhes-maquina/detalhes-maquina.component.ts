import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';
import { FormsModule } from '@angular/forms';
import { MaquinaUpdateDto } from '../../shared/dto/maquinaUpdate.dto';

@Component({
  selector: 'app-detalhes-maquina',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './detalhes-maquina.component.html',
  styleUrl: './detalhes-maquina.component.css'
})
export class DetalhesMaquinaComponent {
  maquina: Maquina = { id: 0, nome: '', localizacao: '', status: 'desligada'};
  maquinaOriginal: Maquina = { id: 0, nome: '', localizacao: '', status: 'desligada'};
  erroLocalizacao: string = '';
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private maquinaService: MaquinaService
  ){}

  ngOnInit(): void {
    this.carregarMaquina();
  }

  carregarMaquina(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.maquinaService.getMaquina(id).subscribe(response => {
      this.maquina = response;
      this.maquinaOriginal = {...response};
    })
  }

  ativarEdicao(): void {
    this.editMode = true;
  }

  cancelarEdicao(): void {
    this.editMode = false;
    this.maquina = {...this.maquinaOriginal};
  }

  salvarEdicao(): void {
    this.validarLocalizacao();
    if (this.erroLocalizacao) {
      return;
    }

    const maquinaUpdateDto: MaquinaUpdateDto = { nome: this.maquina.nome, localizacao: this.maquina.localizacao, status: this.maquina.status }
    this.maquinaService.updateMaquina(this.maquina.id, maquinaUpdateDto).subscribe({
      next: () => {
        this.editMode = false;
        this.maquinaOriginal = {...this.maquina};
      },
      error: (err) => {
        console.error('Erro ao atualizar máquina: ', err);
      }
    });
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'operando': 'Operando',
      'manutencao': 'Em Manutenção',
      'desligada': 'Desligada'
    };
    return statusMap[status] || status;
  }

  validarLocalizacao(): void {
    this.erroLocalizacao = '';
    
    if (!this.maquina.localizacao) {
      return;
    }

    const regex = /^-?\d{1,3}\.\d{1,6},\s*-?\d{1,3}\.\d{1,6}$/;
    
    if (!regex.test(this.maquina.localizacao)) {
      this.erroLocalizacao = 'Formato inválido. Use: -12.345678, -34.567890';
      return;
    }

    const [latStr, lngStr] = this.maquina.localizacao.split(',').map(s => s.trim());
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      this.erroLocalizacao = 'Valores inválidos. Latitude (-90 a 90) e Longitude (-180 a 180)';
    }
  }
}
