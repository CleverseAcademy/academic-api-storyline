import { Course, PrismaClient } from "@prisma/client";
import { ICourseRepository, IUpdateCourse } from ".";
import { ICourseDto } from "../dto/course.dto";

export default class CourseRepository implements ICourseRepository {
  constructor(private prisma: PrismaClient) {}

  // public create(course: ICreateCourse): Promise<Course> {
  //   return this.prisma.course.create({
  //     data: course,
  //   });
  // }

  public getAll(): Promise<ICourseDto[]> {
    return this.prisma.course.findMany({
      include: {
        instructor: {
          select: {
            name: true,
          },
        },
      },
    });
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
