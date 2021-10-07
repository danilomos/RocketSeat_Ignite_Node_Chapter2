import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCouse(req: Request, res: Response) {

    CreateCourseService.execute({ name: "NodeJS", duration: 10, educator: "Danilo" });

    return res.send()
}