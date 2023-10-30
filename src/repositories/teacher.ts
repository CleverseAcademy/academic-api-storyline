import { PrismaClient, Teacher } from "@prisma/client";
import { ITeacherRepository } from ".";
import { ICreateTeacherDto } from "../dto/teacher.dto";

export default class TeacherRepository implements ITeacherRepository {
  constructor(private prisma: PrismaClient) {}

  public async create(teacher: ICreateTeacherDto): Promise<Teacher> {
    try {
      return await this.prisma.teacher.create({ data: teacher });
    } catch (error) {
      throw new Error(`Failed to create teacher ${teacher.username}: ${error}`);
    }
  }
}
