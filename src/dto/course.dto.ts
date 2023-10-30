export interface ICreateCourseDto {
  name: string;
  description: string;
  start_time: string;
  duration: number;
}

export interface IUpdateCourseDto {
  description: string;
  start_time: string;
  duration: number;
}
