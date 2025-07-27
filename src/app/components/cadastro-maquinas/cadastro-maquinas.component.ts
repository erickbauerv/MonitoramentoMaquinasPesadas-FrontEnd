import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Maquina } from '../../shared/models/maquina.model';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-maquinas',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-maquinas.component.html',
  styleUrl: './cadastro-maquinas.component.css'
})
export class CadastroMaquinasComponent {
  erro: string = '';
  novaMaquina: Maquina = { nome: '', localizacao: '', status: 'desligada' }

  constructor(
    private maquinaService: MaquinaService,
    private router: Router
  ) {}

  adicionarMaquina(){
    if(!this.novaMaquina.nome || !this.novaMaquina.localizacao){
      this.erro = 'Preencha todos os campos corretamente!';
      return;
    }

    this.maquinaService.createMaquina(this.novaMaquina).subscribe({
      next: () => {
        this.novaMaquina = { nome: '', localizacao: '', status: 'desligada' }
        this.erro = '';
        alert('Máquina cadastrada');
        this.goToDashboardMaquinas();
      },
      error: (err) => {
        console.error('Erro ao cadastrar máquina: ', err);
        this.novaMaquina = { nome: '', localizacao: '', status: 'desligada' };
        this.goToDashboardMaquinas();
      }
    })
  }

  goToDashboardMaquinas(){
    this.router.navigate(['/dashboard']);
  }
}
