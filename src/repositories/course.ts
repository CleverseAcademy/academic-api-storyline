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

  public partialUpdate(id: string, data: IUpdateCourse): Promise<Course> {
    return this.prisma.course.update({
      where: { id: id },
      data: data,
    });
  }

  public delete(id: string): Promise<Course> {
    return this.prisma.course.delete({
      where: { id: id },
    });
  }
}
