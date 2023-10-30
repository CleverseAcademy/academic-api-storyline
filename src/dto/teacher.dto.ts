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
