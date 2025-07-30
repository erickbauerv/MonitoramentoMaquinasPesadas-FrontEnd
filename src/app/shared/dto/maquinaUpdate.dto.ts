export type MaquinaStatus = 'operando' | 'manutencao' | 'desligada';

export interface MaquinaUpdateDto {
  localizacao: string;
  status: MaquinaStatus;
}