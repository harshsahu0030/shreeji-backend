import express from "express";
import { contactMailController } from "../controllers/mail.controller.js";

const router = express.Router();

router.route("/contact").post(contactMailController);

export default router;
