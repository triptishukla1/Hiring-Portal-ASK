import { Router, type IRouter } from "express";
import healthRouter from "./health";
import candidatesRouter from "./candidates";

const router: IRouter = Router();

router.use(healthRouter);
router.use(candidatesRouter);

export default router;
