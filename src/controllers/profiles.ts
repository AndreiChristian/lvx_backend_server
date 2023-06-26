import { NextFunction, Request, Response } from "express";
import { db } from "../db";

export const getProfilesList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rows } = await db.query("SELECT * FROM profiles", []);

    if (!rows[0]) {
      throw new Error("no profiles");
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getProfilesByGuestId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { guestId } = req.params;

    const { rows } = await db.query(
      "SELECT * FROM profiles WHERE guest_id = $1",
      [guestId]
    );

    if (!rows[0]) {
      throw new Error("no profiles");
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, guest_id } = req.body;

    const { rows } = await db.query(
      "INSERT INTO profiles ( first_name, last_name, guest_id ) VALUES ($1,$2, $3) RETURNING *",
      [first_name, last_name, guest_id]
    );

    if (!rows[0]) {
      throw new Error("could not store profile in the db");
    }

    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
