import { Course, PrismaClient } from "@prisma/client";
import { ICourseRepository, ICreateCourse } from ".";
import { ICourseDto, IUpdateCourseDto } from "../dto/course.dto";

export default class CourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public create(instructorId: string, course: ICreateCourse): Promise<Course> {
    return this.prisma.course.create({
      data: { ...course, instructorId },
    });
  }

  public getAll(): Promise<ICourseDto[]> {
    return this.prisma.course.findMany({
      include: {
        instructor: {
          select: {
            name: true,
            registeredAt: true,
          },
        },
      },
    });
  }

  public async getById(id: string): Promise<ICourseDto> {
    const result = await this.prisma.course.findUnique({
      include: {
        instructor: {
          select: {
            name: true,
            registeredAt: true,
          },
        },
      },
      where: { id },
    });
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
