import { NextFunction, Request, Response } from "express";
import { db } from "../db";

export const getReservationProfilesList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reservationId } = req.params;

  try {
    const { rows } = await db.query(
      "SELECT * FROM reservations_profiles WHERE reservation_id = $1",
      [reservationId]
    );

    if (!rows[0]) {
      throw new Error("no profiles for the reservation");
    }

    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postReservationProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reservationId, profileId } = req.params;

  try {
    const { rows } = await db.query(
      `INSERT INTO reservations_profiles ( profile_id, reservation_id)
        VALUES ( $1, $2 ) RETURNING *`,
      [profileId, reservationId]
    );

    if (!rows[0]) {
      throw new Error("no profiles for the reservation");
    }

    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
