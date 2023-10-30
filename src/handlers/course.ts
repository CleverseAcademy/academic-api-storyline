import { ICourseHandler } from ".";
import { ICourseRepository } from "../repositories";

export default class CourseHandler implements ICourseHandler {
  constructor(private repo: ICourseRepository) {}

  public getAll: ICourseHandler["getAll"] = async (req, res) => {
    const result = await this.repo.getAll();

    return res.status(200).json(result).end();
  };

  public deleteById: ICourseHandler["deleteById"] = async (req, res) => {
    const result = await this.repo.delete(req.params.id);

    return res.status(200).json(result).end();
  };

  public updateById: ICourseHandler["updateById"] = async (req, res) => {
    const { description, duration, start_time } = req.body;

    const result = await this.repo.partialUpdate(req.params.id, {
      description,
      duration,
      start_time: new Date(start_time),
    });

    return res.status(200).json(result).end();
  };
}
