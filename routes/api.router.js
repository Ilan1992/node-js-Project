import express from "express";
import usersRouter from "./api/users.router.js";
import cardsRouter from "./api/cards.router.js";
import handleError from "../utils/handleError.js";

const router = express.Router();

router.use("/users", usersRouter);

router.use("/cards", cardsRouter)

router.use((req , res) =>{
  handleError(res , 404, "Page Not Found")
})

export default router;