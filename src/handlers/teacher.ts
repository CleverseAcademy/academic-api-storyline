import { ITeacherHandler } from ".";
import { ITeacherRepository } from "../repositories";
import { bcrypted } from "../utils/bcrypt";

export default class TeacherHandler implements ITeacherHandler {
  constructor(private repo: ITeacherRepository) {}

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
}
