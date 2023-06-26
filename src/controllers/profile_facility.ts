import { NextFunction, Request, Response } from "express";
import { db } from "../db";

export const getProfileFacilityList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rows } = await db.query("SELECT * FROM profile_facilities", []);

    if (!rows[0]) {
      throw new Error("error with the db");
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getOneProfileFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rows } = await db.query("", []);

    if (!rows[0]) {
      throw new Error("error with the db");
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getFacilityByProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;

    const { rows } = await db.query(
      `SELECT f.*
    FROM profile_facilities as p
        JOIN facilities as f ON p.facility_id = f.id
    WHERE p.profile_id = $1`,
      [profileId]
    );

    if (!rows) {
      throw new Error("error with the db");
    }

    if (!rows[0]) {
      res.json([]);
    } else {
      res.json(rows);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postProfileFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { profile_id, facility_id, requested_call } = req.body;

  try {
    const { rows } = await db.query(
      `INSERT INTO profile_facilities(profile_id, facility_id, requested_call)
    VALUES($1, $2, $3) RETURNING * `,
      [profile_id, facility_id, requested_call]
    );

    if (!rows[0]) {
      throw new Error("error with the db");
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const patchProfileFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rows } = await db.query("", []);

    if (!rows[0]) {
      throw new Error("error with the db");
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteProfileFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId, facilityId } = req.params;

    const result = await db.query(
      `DELETE FROM profile_facilities
    WHERE profile_id = $1
        AND facility_id = $2;`,
      [profileId, facilityId]
    );

    if (result.rowCount === 0) {
      throw new Error("No rows were deleted");
    }

    res.json({ message: "Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
