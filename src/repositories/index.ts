import { Course, Teacher } from "@prisma/client";
import { IUpdateCourseDto } from "../dto/course.dto";
import { ICreateTeacherDto } from "../dto/teacher.dto";

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

export interface ITeacherRepository {
  create(teacher: ICreateTeacherDto): Promise<Teacher>;
  getAll(): Promise<Teacher[]>;
  findNameBeginsWith(begining: string): Promise<Teacher[]>;
}
