import { NextFunction, Request, Response } from "express";
import { db, pool } from "../db";

export const getReservationProfilesList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reservationId } = req.params;

  console.log("ReservationId", reservationId);

  try {
    const { rows } = await db.query(
      "SELECT * FROM reservations_profiles WHERE reservation_id = $1",
      [reservationId]
    );

    if (!rows[0]) {
      res.status(204).json([]);
    } else {
      res.status(200).json(rows);
    }
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
  const { reservationId } = req.params;

  const { first_name, last_name, guest_id } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await db.query(
      "INSERT INTO profiles ( first_name, last_name, guest_id, global ) VALUES ($1,$2, $3, FALSE) RETURNING id",
      [first_name, last_name, guest_id]
    );

    const response = await client.query(
      `INSERT INTO reservations_profiles ( profile_id, reservation_id)
        VALUES ( $1, $2 ) RETURNING *`,
      [rows[0].id, reservationId]
    );

    if (!response.rows[0]) {
      throw new Error("Could not create");
    }

    await client.query("COMMIT");

    res.status(200).json(rows);
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    next(err);
  } finally {
    client.release();
  }

  //   const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
  //   const res = await client.query(queryText, ['brianc'])
  //   const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
  //   const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
  //   await client.query(insertPhotoText, insertPhotoValues)
};
