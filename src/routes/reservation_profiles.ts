import { Router } from "express";
import {
  getReservationProfilesList,
  postReservationProfile,
} from "../controllers/reservation_profiles";

const router = Router();

router.get("/reservations_profiles/:reservationId", getReservationProfilesList);

router.post("/reservations_profiles/:reservationId/", postReservationProfile);

router.get("/reservations_profiles/:reservationId/:profileId");

router.patch("/reservations_profiles/:reservationId/:profileId");

router.delete("/reservations_profiles/:reservationId/:profileId");

export default router;
