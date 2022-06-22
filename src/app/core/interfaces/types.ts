export type TranslateTypes = 'games' | 'frontend';

export interface ITranslateDto {
  lang: string;
  translates: object;
  type: TranslateTypes;
}

export interface PortalsLangs {
  id: number;
  lang: string;
  portal: string;
  active: boolean;
  label: string;
}
