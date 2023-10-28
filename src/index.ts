import { Course, PrismaClient, Teacher } from "@prisma/client";
import express, { Request } from "express";
import { COURSE_DURATION_LIMIT } from "./const";
import { ICreateCourseDto, IUpdateCourseDto } from "./entities/course.dto";
import { ICreateTeacherDto } from "./entities/teacher.dto";

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.post(
  "/teacher",
  async (req: Request<{}, Teacher | string, ICreateTeacherDto>, res) => {
    const { name, username } = req.body;

    if (name.length === 0) return res.status(400).send(`name is empty`);
    if (username.length === 0) return res.status(400).send(`username is empty`);

    const result = await client.teacher.create({
      data: { name, username },
    });

    return res.status(201).json(result);
  }
);

app.get(
  "/teacher",
  async (req: Request<{}, Teacher[] | string, null, { name: string }>, res) => {
    const { name } = req.query;

    const result = await client.teacher.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
    });

    return res.status(200).json(result);
  }
);

app.post(
  "/course",
  async (req: Request<{}, Course | string, ICreateCourseDto>, res) => {
    const { description, duration, name, start_time } = req.body;

    // Validation logics
    const duration_in_seconds = Number(duration);
    if (isNaN(duration_in_seconds))
      return res.status(400).send(`Duration is ${duration_in_seconds}`);

    if (duration_in_seconds > COURSE_DURATION_LIMIT)
      return res
        .status(400)
        .send(`Duration is more than ${COURSE_DURATION_LIMIT}`);

    if (isNaN(Date.parse(start_time)))
      return res.status(400).send(`start_time is not in Date format`);

    if (name.length === 0) return res.status(400).send(`name is empty`);

    if (description.length === 0)
      return res.status(400).send(`description is empty`);

    const result = await client.course.create({
      data: {
        name,
        description,
        duration: duration_in_seconds,
        start_time: new Date(start_time),
      },
    });

    return res.status(201).json(result);
  }
);

app.get("/course", async (req, res) => {
  const result = await client.course.findMany();

  return res.status(200).json(result);
});

app.get("/course/:id", async (req: Request<{ id: string }>, res) => {
  // UUID length
  if (req.params.id.length != 36)
    return res.status(400).send("ID is incorrect");

  const course = await client.course.findUnique({
    where: { id: req.params.id },
  });

  return res.status(200).json(course);
});

app.patch(
  "/course/:id",
  async (
    req: Request<{ id: string }, Course | string, IUpdateCourseDto>,
    res
  ) => {
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

    const result = await client.course.update({
      data: {
        description,
        start_time: start_time,
        duration: duration_in_seconds,
      },
      where: { id: req.params.id },
    });

    return res.status(201).json(result);
  }
);

app.delete("/course/:id", async (req: Request<{ id: string }>, res) => {
  // UUID length
  if (req.params.id.length != 36)
    return res.status(400).send("ID is incorrect");

  const result = await client.course.delete({
    where: { id: req.params.id },
  });

  return res.status(200).json(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
