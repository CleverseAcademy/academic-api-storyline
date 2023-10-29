import { PrismaClient, Teacher } from "@prisma/client";
import { ITeacherRepository } from ".";
import { ICreateTeacherDto } from "../dto/teacher.dto";

export default class TeacherRepository implements ITeacherRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(teacher: ICreateTeacherDto): Promise<Teacher> {
    return this.prisma.teacher.create({
      data: teacher,
    });
  }

  getAll(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany();
  }

  findNameBeginsWith(begining: string): Promise<Teacher[]> {
    return this.prisma.teacher.findMany({
      where: { name: { startsWith: begining } },
    });
  }
}
