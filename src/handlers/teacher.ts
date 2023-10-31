import { sign } from "jsonwebtoken";
import { ITeacherHandler } from ".";
import { JWT_SECRET } from "../const";
import { ITeacherRepository } from "../repositories";
import { bcrypted, verifyPassword } from "../utils/bcrypt";

export default class TeacherHandler implements ITeacherHandler {
  constructor(private repo: ITeacherRepository) {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  }

  public register: ITeacherHandler["register"] = async (req, res) => {
    const { name, username, password } = req.body;
    try {
      const { password: _, ...rest } = await this.repo.create({
        name,
        username,
        password: bcrypted(password),
      });
      return res.status(201).json(rest).end();
    } catch (error) {
      return res
        .status(500)
        .send(`Failed to create user ${username}: ${error}`)
        .end();
    }
  };

  public login: ITeacherHandler["login"] = async (req, res) => {
    const { username, password } = req.body;

    try {
      const teacherInfo = await this.repo.findByUsername(username);

      if (!verifyPassword(password, teacherInfo.password))
        throw new Error("Unauthorized");

      const token = sign({ id: teacherInfo.id }, JWT_SECRET!, {
        algorithm: "HS512",
        expiresIn: "12h",
        issuer: "academic-api",
        subject: "teacher-credential",
      });

      return res.status(200).json({
        id: teacherInfo.id,
        username: teacherInfo.username,
        token,
      });
    } catch (error) {
      return res.status(401).json({ err: "Invalid username or password" });
    }
  };
}
