import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Maquina } from '../../shared/models/maquina.model';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaquinaCreateDto } from '../../shared/dto/maquinaCreate.dto';

@Component({
  selector: 'app-cadastro-maquinas',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-maquinas.component.html',
  styleUrl: './cadastro-maquinas.component.css'
})
export class CadastroMaquinasComponent {
  erro: string = '';
  erroLocalizacao: string = '';
  novaMaquina: MaquinaCreateDto = { nome: '', localizacao: '', status: 'desligada' }

  constructor(
    private maquinaService: MaquinaService,
    private router: Router
  ) {}

  adicionarMaquina(){
    if(!this.novaMaquina.nome || !this.novaMaquina.localizacao){
      this.erro = 'Preencha todos os campos corretamente!';
      return;
    }

    this.validarLocalizacao();
    if (this.erroLocalizacao) {
      this.erro = 'Corrija os erros no formulário';
      return;
    }

    this.maquinaService.createMaquina(this.novaMaquina).subscribe({
      next: () => {
        this.novaMaquina = { nome: '', localizacao: '', status: 'desligada' }
        this.erro = '';
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

  validarLocalizacao(): void {
    this.erroLocalizacao = '';
    
    if (!this.novaMaquina.localizacao) {
      return;
    }

    const regex = /^-?\d{1,3}\.\d{1,6},\s*-?\d{1,3}\.\d{1,6}$/;
    
    if (!regex.test(this.novaMaquina.localizacao)) {
      this.erroLocalizacao = 'Formato inválido. Use: -12.345678, -34.567890';
      return;
    }

    const [latStr, lngStr] = this.novaMaquina.localizacao.split(',').map(s => s.trim());
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      this.erroLocalizacao = 'Valores inválidos. Latitude (-90 a 90) e Longitude (-180 a 180)';
    }
  }
}
