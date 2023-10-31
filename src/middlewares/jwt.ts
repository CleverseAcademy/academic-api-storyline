import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../const";

interface AuthState {
  id?: string;
}

export default class JWTMiddleware {
  constructor() {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  }
  public auth: RequestHandler<unknown, unknown, unknown, unknown, AuthState> = (
    req,
    res,
    next
  ) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Unauthorized").end();

    try {
      const { id } = verify(token, JWT_SECRET!) as JwtPayload;

      if (typeof id !== "string")
        return res
          .status(400)
          .send(
            `Unexpected id value decoded from the Authorization token ${id}`
          );

      res.locals.id = id;
    } catch (error) {
      return res.status(403).send(error).end();
    }

    return next();
  };
}
