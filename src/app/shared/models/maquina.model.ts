export type MaquinaStatus = 'operando' | 'manutencao' | 'desligada';

export interface Maquina {
  id?: string;
  nome: string;
  localizacao: string;
  status: MaquinaStatus;
}