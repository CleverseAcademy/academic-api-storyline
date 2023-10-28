import { Course } from "@prisma/client";

export interface ICreateCourseDto
  extends Omit<
    {
      [k in keyof Course]: string;
    },
    "id" | "duration"
  > {
  duration: string | number;
}
export interface IUpdateCourseDto extends Omit<ICreateCourseDto, "name"> {}
