import { Course } from "@prisma/client";

export interface ICreateCourse {
  name: string;
  description: string;
  start_time: Date;
  duration: number;
}

export interface IUpdateCourse {
  description: string;
  start_time: Date;
  duration: number;
}

export interface ICourseRepository {
  create(course: ICreateCourse): Promise<Course>;
  getAll(): Promise<Course[]>;
  partialUpdate(id: string, data: IUpdateCourse): Promise<Course>;
  delete(id: string): Promise<Course>;
}
