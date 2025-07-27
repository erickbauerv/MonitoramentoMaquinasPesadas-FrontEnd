import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../shared/models/maquina.model';

@Component({
  selector: 'app-detalhes-maquina',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhes-maquina.component.html',
  styleUrl: './detalhes-maquina.component.css'
})
export class DetalhesMaquinaComponent {
  maquina: any;

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
}
