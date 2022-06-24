export type TranslateTypes = 'games' | 'frontend';
export type Portals = Record<string, PortalObj>;

export type PortalObj = {
  langs: Lang[];
  translates: Translate[];
  name: string;
  id: number;
};

export interface Lang {
  id?: number;
  locale: string;
  active: boolean;
  label: string;
  portal: Portal;
}

export interface Portal {
  id?: number;
  name: string;
  path: string;
  langs: Lang[];
  translates: Translate[];
}

export interface Translate {
  id?: number;
  locale: string;
  updated: Date;
  translates: string;
  portal: Portal;
}

export interface CreatePortalDto {
  name: string;
  path: string;
  lang: CreateLangDto;
  translate: CreateTranslateDto;
}

export interface CreateLangDto {
  locale: string;
  active: boolean;
  label: string;
  portalId?: number;
}

export interface CreateTranslateDto {
  locale: string;
  translates: string;
  portalId?: number;
}
