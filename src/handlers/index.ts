import { Course } from "@prisma/client";
import { RequestHandler } from "express";
import { ICourseDto, IUpdateCourseDto } from "../dto/course.dto";
import {
  ICreateTeacherDto,
  ILoginResultDto,
  ITeacherDto,
  ITeacherLoginDto,
} from "../dto/teacher.dto";

interface Empty {}
interface ID {
  id: string;
}

export interface ICourseHandler {
  getAll: RequestHandler<Empty, ICourseDto[]>;
  deleteById: RequestHandler<ID, Course>;
  updateById: RequestHandler<ID, Course, IUpdateCourseDto>;
}

export interface ITeacherHandler {
  register: RequestHandler<Empty, ITeacherDto | string, ICreateTeacherDto>;
  login: RequestHandler<Empty, ILoginResultDto, ITeacherLoginDto>;
}
