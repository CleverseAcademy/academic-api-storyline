import { Course, PrismaClient, Teacher } from "@prisma/client";
import express, { Request } from "express";
import { COURSE_DURATION_LIMIT } from "./const";
import {
  ICourseDto,
  ICreateCourseDto,
  IUpdateCourseDto,
} from "./dto/course.dto";
import { ICreateTeacherDto } from "./dto/teacher.dto";
import { ICourseRepository, ITeacherRepository } from "./repositories";
import CourseRepository from "./repositories/course";
import TeacherRepository from "./repositories/teacher";

const client = new PrismaClient();
const app = express();
const courseRepository: ICourseRepository = new CourseRepository(client);
const teacherRepository: ITeacherRepository = new TeacherRepository(client);

app.use(express.json());

app.post(
  "/teacher",
  async (req: Request<{}, Teacher | string, ICreateTeacherDto>, res) => {
    const { name, username } = req.body;

    if (name.length === 0) return res.status(400).send(`name is empty`);
    if (username.length === 0) return res.status(400).send(`username is empty`);

    const result = await teacherRepository.create({ name, username });

    return res.status(201).json(result);
  }
);

app.get("/teacher", async (req: Request<{}, Teacher[] | string>, res) => {
  const result = await teacherRepository.getAll();

  return res.status(200).json(result);
});

app.get(
  "/teacher/search",
  async (req: Request<{}, Teacher[] | string, null, { name: string }>, res) => {
    const { name } = req.query;

    const result = await teacherRepository.findNameBeginsWith(name);

    return res.status(200).json(result);
  }
);

app.post(
  "/course",
  async (
    req: Request<{}, Course | string, ICreateCourseDto, { teacherId: string }>,
    res
  ) => {
    const { description, duration, name, start_time } = req.body;

    // Validation logics
    if (req.query.teacherId.length != 36)
      return res.status(400).send("teacherId is incorrect");

    if (typeof duration !== "number")
      return res.status(400).send(`Duration is not a number`);

    if (duration > COURSE_DURATION_LIMIT)
      return res
        .status(400)
        .send(`Duration is more than ${COURSE_DURATION_LIMIT}`);

    if (isNaN(Date.parse(start_time)))
      return res.status(400).send(`start_time is not in Date format`);

    if (name.length === 0) return res.status(400).send(`name is empty`);

    if (description.length === 0)
      return res.status(400).send(`description is empty`);

    const result = await courseRepository.create(req.query.teacherId, {
      name,
      description,
      start_time: new Date(start_time),
      duration,
    });

    return res.status(201).json(result);
  }
);

app.get("/course", async (req: Request<{}, ICourseDto[]>, res) => {
  const result = await courseRepository.getAll();

  return res.status(200).json(result);
});

app.get(
  "/course/:id",
  async (req: Request<{ id: string }, ICourseDto | string>, res) => {
    // UUID length
    if (req.params.id.length != 36)
      return res.status(400).send("ID is incorrect");

    const course = await courseRepository.getById(req.params.id);

    return res.status(200).json(course);
  }
);

app.patch(
  "/course/:id",
  async (req: Request<{ id: string }, unknown, IUpdateCourseDto>, res) => {
    const { description, duration, start_time } = req.body;

    // UUID length
    if (req.params.id.length != 36)
      return res.status(400).send("ID is incorrect");

    if (isNaN(Date.parse(start_time)))
      return res.status(400).send(`start_time is not in Date format`);

    const duration_in_seconds = Number(duration);

    if (isNaN(duration_in_seconds))
      return res.status(400).send(`Duration is ${duration_in_seconds}`);

    if (duration_in_seconds > COURSE_DURATION_LIMIT)
      return res
        .status(400)
        .send(`Duration is more than ${COURSE_DURATION_LIMIT}`);

    if (description.length === 0)
      return res.status(400).send(`description is empty`);

    const result = await courseRepository.partialUpdate(req.params.id, {
      description,
      duration,
      start_time,
    });

    return res.status(200).json(result);
  }
);

app.delete("/course/:id", async (req, res) => {
  // UUID length
  if (req.params.id.length != 36)
    return res.status(400).send("ID is incorrect");

  const result = await courseRepository.delete(req.params.id);

  return res.status(200).json(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
