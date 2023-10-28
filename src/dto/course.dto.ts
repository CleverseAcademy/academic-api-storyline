export interface ICreateCourseDto {
  name: string;
  description: string;
  start_time: string;
  duration: number;
}

export interface IUpdateCourseDto extends Omit<ICreateCourseDto, "name"> {}
