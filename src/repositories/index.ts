import { Course, Teacher } from "@prisma/client";
import { ICourseDto, IUpdateCourseDto } from "../dto/course.dto";
import { ICreateTeacherDto } from "../dto/teacher.dto";

export interface ICreateCourse {
  name: string;
  description: string;
  start_time: Date;
  duration: number;
}

export interface ICourseRepository {
  create(instructorId: string, course: ICreateCourse): Promise<Course>;
  getAll(): Promise<ICourseDto[]>;
  getById(id: string): Promise<ICourseDto>;
  partialUpdate(id: string, data: IUpdateCourseDto): Promise<Course>;
  delete(id: string): Promise<Course>;
}

export interface ITeacherRepository {
  create(teacher: ICreateTeacherDto): Promise<Teacher>;
  getAll(): Promise<Teacher[]>;
  findNameBeginsWith(begining: string): Promise<Teacher[]>;
}
