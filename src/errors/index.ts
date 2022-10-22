import { Request, Response } from "express";

export const handle404s = (_req: Request, res: Response) => {
    res.status(404).send({ msg: "Path does not exist" });
  };

export const handle405s = (_req: Request, res: Response) => {
    res.status(405).send({ msg: "Method Not Allowed" });
  };  