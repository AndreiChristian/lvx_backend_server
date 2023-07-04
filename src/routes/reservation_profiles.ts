import { Router } from "express";

const router = Router()

router.get("/reservations_profiles/:reservationId/:guestId")

router.post("/reservations_profiles/:reservationId/:guestId")

router.get("/reservations_profiles/:reservationId/:profileId")

router.patch("/reservations_profiles/:reservationId/:profileId")

router.delete("/reservations_profiles/:reservationId/:profileId")


export default router