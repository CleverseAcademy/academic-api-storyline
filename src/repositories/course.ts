import { Course, PrismaClient } from "@prisma/client";
import { ICourseRepository, ICreateCourse } from ".";
import { IUpdateCourseDto } from "../dto/course.dto";

export default class CourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public create(instructorId: string, course: ICreateCourse): Promise<Course> {
    return this.prisma.course.create({
      data: { ...course, instructorId },
    });
  }

  public getAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  public async getById(id: string): Promise<Course> {
    const result = await this.prisma.course.findUnique({ where: { id } });
    if (!result) throw new Error("Course not found");
    return result;
  }

  partialUpdate(id: string, data: IUpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({
      data,
      where: { id },
    });
  }

  delete(id: string): Promise<Course> {
    return this.prisma.course.delete({ where: { id } });
  }
}
