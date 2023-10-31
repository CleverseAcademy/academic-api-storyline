import { Course, Teacher } from "@prisma/client";
import { ICourseDto } from "../dto/course.dto";
import { ICreateTeacherDto } from "../dto/teacher.dto";

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

export interface ITeacherRepository {
  create(teacher: ICreateTeacherDto): Promise<Teacher>;
  findByUsername(username: string): Promise<Teacher>;
}
