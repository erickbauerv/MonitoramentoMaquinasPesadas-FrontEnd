export type MaquinaStatus = 'operando' | 'manutencao' | 'desligada';

export interface MaquinaCreateDto {
  nome: string;
  localizacao: string;
  status: MaquinaStatus;
}