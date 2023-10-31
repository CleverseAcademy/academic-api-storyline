export interface ITeacherDto {
  id: string;
  createdAt: Date;
  name: string;
  username: string;
}

export interface ICreateTeacherDto {
  name: string;
  username: string;
  password: string;
}

export interface ITeacherLoginDto {
  username: string;
  password: string;
}

export type ILoginResultDto =
  | { err: string }
  | {
      id: string;
      username: string;
      token: string;
    };
