import { Router } from "express";
import { createLog } from "./logs.service.js";
const router = Router()
// 7. create log
router.post("/create", async (req, res, next) => {
  const result = await createLog(req.body);
  return res.status(201).json({ result });
});

export default router