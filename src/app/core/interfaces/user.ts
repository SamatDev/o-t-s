export enum Role {
  SUPER = 'super',
  EDITOR = 'editor',
}

export interface User {
  username: string;
  password: string;
  role: Role;
  authdata?: string;
}
