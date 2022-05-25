export type TranslateTypes = 'games' | 'frontend';

export interface ITranslateDto {
  lang: string;
  translates: object;
  type: TranslateTypes;
}
