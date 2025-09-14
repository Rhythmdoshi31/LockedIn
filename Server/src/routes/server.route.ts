import { Router } from "express";
import type { Request, Response, Router as ExpressRouter } from "express";

const router: ExpressRouter = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Server route working ✅");
});

export default router;
