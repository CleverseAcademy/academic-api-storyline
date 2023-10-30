import { Course } from "@prisma/client";
import { ICourseDto } from "../dto/course.dto";

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
  // create(course: ICreateCourse): Promise<Course>;
  getAll(): Promise<ICourseDto[]>;
  partialUpdate(id: string, data: IUpdateCourse): Promise<Course>;
  delete(id: string): Promise<Course>;
}
