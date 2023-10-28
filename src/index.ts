import { Course, PrismaClient } from "@prisma/client";
import express, { Request } from "express";
import { COURSE_DURATION_LIMIT } from "./const";
import { ICreateCourseDto } from "./dto/course.dto";
import { ICourseRepository } from "./repositories";
import CourseRepository from "./repositories/course";

const client = new PrismaClient();
const app = express();
const courseRepository: ICourseRepository = new CourseRepository(client);

app.use(express.json());

app.post(
  "/course",
  async (req: Request<{}, Course | string, ICreateCourseDto>, res) => {
    const { description, duration, name, start_time } = req.body;

    // Validation logics
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

    const result = await courseRepository.create({
      name,
      description,
      start_time: new Date(start_time),
      duration,
    });

    return res.status(201).json(result);
  }
);

app.get("/course", async (req: Request<{}, Course[]>, res) => {
  const result = await courseRepository.getAll();

  return res.status(200).json(result);
});

app.get("/course/:id", async (req: Request<{ id: string }, Course>, res) => {
  const course = await courseRepository.getById(req.params.id);

  return res.status(200).json(course);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
