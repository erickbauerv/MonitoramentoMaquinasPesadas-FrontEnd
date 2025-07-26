export type MaquinaStatus = 'operando' | 'manutencao' | 'desligada';

export interface Maquina {
  id?: number;
  nome: string;
  localizacao: string;
  status: MaquinaStatus;
}