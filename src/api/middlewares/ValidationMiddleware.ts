import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationError } from "yup";
import { formatYupError } from "../helpers/Format";

const validation =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      await schema.validate(body);
      return next();
    } catch (err) {
      res.status(400);
      throw new Error(JSON.stringify(formatYupError(err as ValidationError)));
    }
  };

export default validation;
