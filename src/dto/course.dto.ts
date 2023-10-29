import { Teacher } from "@prisma/client";

export interface ICreateCourseDto {
  name: string;
  description: string;
  start_time: string;
  duration: number;
}

export interface IUpdateCourseDto extends Omit<ICreateCourseDto, "name"> {}

export interface ICourseDto {
  name: string;
  description: string;
  start_time: Date;
  duration: number;
  instructor: Pick<Teacher, "name" | "registeredAt">;
}
