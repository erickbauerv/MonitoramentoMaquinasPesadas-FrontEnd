import { Component } from '@angular/core';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-maquinas',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-maquinas.component.html',
  styleUrl: './dashboard-maquinas.component.css'
})
export class DashboardMaquinasComponent {
  maquinas: Maquina[] = [];
  filtroStatusMaquina: string = '';
  erro: string = '';

  constructor(
    public maquinaService: MaquinaService
  ) {}

  ngOnInit(): void {
    this.carregarMaquinas();
  }

  carregarMaquinas(): void {
    this.maquinaService.getMaquinas(this.filtroStatusMaquina).subscribe({
      next: (maquinas: Maquina[]) => {
        this.maquinas = maquinas;
      },
      error: (err) => {
        console.error('Erro ao carregar máquinas: ', err);
        this.maquinas = [];
      }
    })
  }
}
