import express, { Request, Response } from "express";
const router = express.Router();
import ticketService from "../domain/services/ticketService";

import { TrataErrorUtil } from "../utils/errorHandler";


router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const ticket = ticketService.getTicketById(parseInt(req.params.ID));
    res.status(200).json(ticket);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await ticketService.createTicket(req.body, "MUDAR!!!!!!!");
    res.status(200).json("Usuário criado com sucesso!");
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.put("/:ID", async (req: Request, res: Response) => {
  try {
    const ticket = ticketService.updateTicketById(parseInt(req.params.ID), req.body);
    res.status(200).json(ticket);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});
router.delete("/:ID", async (req: Request, res: Response) => {
  try {
    await ticketService.deleteTicketById(parseInt(req.params.ID));
    res
      .status(200)
      .json(`Usuário com id ${req.params.ID} deletado com sucesso!`);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
