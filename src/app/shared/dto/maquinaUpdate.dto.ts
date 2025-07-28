export type MaquinaStatus = 'operando' | 'manutencao' | 'desligada';

export interface MaquinaUpdateDto {
  nome: string;
  localizacao: string;
  status: MaquinaStatus;
}