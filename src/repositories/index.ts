import { Course } from "@prisma/client";
import { IUpdateCourseDto } from "../dto/course.dto";

export interface ICreateCourse {
  name: string;
  description: string;
  start_time: Date;
  duration: number;
}

export interface ICourseRepository {
  create(course: ICreateCourse): Promise<Course>;
  getAll(): Promise<Course[]>;
  getById(id: string): Promise<Course>;
  partialUpdate(id: string, data: IUpdateCourseDto): Promise<Course>;
  delete(id: string): Promise<Course>;
}
