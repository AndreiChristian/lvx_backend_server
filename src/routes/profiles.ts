import { Router } from "express";
import {
  getProfilesByGuestId,
  getProfilesList,
  postProfile,
} from "../controllers/profiles";

const router = Router();

router.get("/profiles", getProfilesList);

router.get("/profiles/:guestId", getProfilesByGuestId);

router.post("/profiles", postProfile);

export default router;
