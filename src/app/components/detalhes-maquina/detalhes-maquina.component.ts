import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';
import { FormsModule } from '@angular/forms';
import { MaquinaUpdateDto } from '../../shared/dto/maquinaUpdate.dto';
import { ValidacoesService } from '../../services/validacoes/validacoes.service';

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
  erroNome: string = '';
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private maquinaService: MaquinaService,
    private validacoesService: ValidacoesService
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

    const maquinaUpdateDto: MaquinaUpdateDto = { localizacao: this.maquina.localizacao, status: this.maquina.status }
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
    this.erroLocalizacao = this.validacoesService.validarLocalizacao(this.maquina.localizacao);
  }

  validarNome(): void {
    this.erroNome = this.validacoesService.validarNome(this.maquina.nome);
    this.erroNome = '';
  }
}
