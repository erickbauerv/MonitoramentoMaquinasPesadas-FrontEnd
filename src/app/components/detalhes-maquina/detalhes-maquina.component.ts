import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-maquina',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './detalhes-maquina.component.html',
  styleUrl: './detalhes-maquina.component.css'
})
export class DetalhesMaquinaComponent {
  maquina: Maquina = { nome: '', localizacao: '', status: 'desligada'};

  constructor(
    private route: ActivatedRoute,
    private maquinaService: MaquinaService
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.maquinaService.getMaquina(id).subscribe(response => {
      this.maquina = response;
    })
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'operando': 'Operando',
      'manutencao': 'Em Manutenção',
      'desligada': 'Desligada'
    };
    return statusMap[status] || status;
  }
}
