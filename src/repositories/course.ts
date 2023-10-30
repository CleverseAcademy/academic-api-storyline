import { Course, PrismaClient } from "@prisma/client";
import { ICourseRepository, ICreateCourse, IUpdateCourse } from "./course.type";

export default class CourseRepository implements ICourseRepository {
  constructor(private prisma: PrismaClient) {}

  public create(course: ICreateCourse): Promise<Course> {
    return this.prisma.course.create({
      data: course,
    });
  }

  public getAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }
}
