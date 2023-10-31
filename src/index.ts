import { PrismaClient } from "@prisma/client";
import express from "express";
import { ICourseHandler, ITeacherHandler } from "./handlers";
import CourseHandler from "./handlers/course";
import TeacherHandler from "./handlers/teacher";
import { ICourseRepository, ITeacherRepository } from "./repositories";
import CourseRepository from "./repositories/course";
import TeacherRepository from "./repositories/teacher";

const app = express();

const client = new PrismaClient();

const courseRepo: ICourseRepository = new CourseRepository(client);
const courseHandler: ICourseHandler = new CourseHandler(courseRepo);

const teacherRepo: ITeacherRepository = new TeacherRepository(client);
const teacherHandler: ITeacherHandler = new TeacherHandler(teacherRepo);

app.use(express.json());

const courseRouter = express.Router();

app.use("/course", courseRouter);

courseRouter.patch("/:id", courseHandler.updateById);

courseRouter.delete("/:id", courseHandler.deleteById);

courseRouter.get("/", courseHandler.getAll);

const teacherRouter = express.Router();

app.use("/teacher", teacherRouter);

teacherRouter.post("/", teacherHandler.register);
teacherRouter.post("/login", teacherHandler.login);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// app.post(
//   "/course",
//   async (req: Request<{}, Course | string, ICreateCourseDto>, res) => {
//     const { duration, start_time, name, description } = req.body;

//     // validate duration
//     if (typeof duration !== "number")
//       return res.status(400).send("Duration is not a number");

//     if (duration > DURATION_LIMIT_IN_SECONDS)
//       return res.status(400).send("Duration is more than limited (8 hrs)");
//     // validate start_time

//     if (typeof start_time !== "string")
//       return res.status(400).send("start_time is not a string");
//     if (isNaN(Date.parse(start_time)))
//       return res.status(400).send("start_time is incorrect date format");

//     // validate name
//     if (typeof name !== "string")
//       return res.status(400).send("name is not a string");
//     if (name.length === 0)
//       return res.status(400).send("name can not be empty string");

//     // validate description
//     if (typeof description !== "string")
//       return res.status(400).send("description is not a string");
//     if (description.length === 0)
//       return res.status(400).send("description can not be empty string");

//     const result = await courseRepo.create({
//       description,
//       duration,
//       name,
//       start_time: new Date(start_time),
//     });

//     return res.status(201).json(result);
//   }
// );
