import { Component } from '@angular/core';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-maquinas',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard-maquinas.component.html',
  styleUrl: './dashboard-maquinas.component.css'
})
export class DashboardMaquinasComponent {
  maquinas: Maquina[] = [];
  filtroStatusMaquina: string = '';
  erro: string = '';

  constructor(
    private maquinaService: MaquinaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarMaquinas();
  }

  carregarMaquinas(): void {
    this.maquinaService.getMaquinas(this.filtroStatusMaquina).subscribe({
      next: (response: Maquina[]) => {
        this.maquinas = response;
      },
      error: (err) => {
        console.error('Erro ao carregar máquinas: ', err);
        this.maquinas = [];
      }
    })
  }

  onStatusChange() {
    this.carregarMaquinas();
  }

  goToCadastroMaquina(){
    this.router.navigate(['/cadastro']);
  }

  goToMapa(){
    this.router.navigate(['/mapa']);
  }
}
