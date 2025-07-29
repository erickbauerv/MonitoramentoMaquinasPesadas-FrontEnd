import { Routes } from '@angular/router';
import { DashboardMaquinasComponent } from './components/dashboard-maquinas/dashboard-maquinas.component';
import { CadastroMaquinasComponent } from './components/cadastro-maquinas/cadastro-maquinas.component';
import { DetalhesMaquinaComponent } from './components/detalhes-maquina/detalhes-maquina.component';
import { MapaComponent } from './components/mapa/mapa.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardMaquinasComponent },
    { path: 'cadastro', component: CadastroMaquinasComponent },
    { path: 'maquina/:id', component: DetalhesMaquinaComponent },
    { path: 'mapa', component: MapaComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
