import { NextFunction, Request, Response, Router } from "express";
import { db } from "../db";
import { compare, hash } from "bcryptjs";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const { rows } = await db.query(
        "SELECT * FROM guests where email = $1 ",
        [email]
      );

      if (!rows[0]) {
        throw new Error("no email");
      }

      const isMatch = await compare(password, rows[0].password_hash);

      if (isMatch) {
        res.status(201).json(rows);
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        first_name,
        last_name,
        password,
        email,
        phone_number,
        street,
        number,
        zip,
        city,
        state,
        country,
      } = req.body;

      const addressResponse = await db.query(
        `INSERT INTO addresses (street, number, zip, city, country)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
        [street, number, zip, city, country]
      );

      if (addressResponse.rows.length === 0) {
        throw new Error("Could not create address");
      }

      const address_id = addressResponse.rows[0].id!;

      const password_hash = await hash(password, 10);
      const userResponse = await db.query(
        `INSERT INTO guests (first_name, last_name, email, phone_number, password_hash, address_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
        [first_name, last_name, email, phone_number, password_hash, address_id]
      );

      if (userResponse.rows.length === 0) {
        throw new Error("Could not create new user");
      }

      await db.query(
        "INSERT INTO profiles ( first_name, last_name, guest_id ) VALUES ($1, $2, $3) RETURNING *",
        [first_name, last_name, userResponse.rows[0].id]
      );

      res.json(userResponse.rows);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);
export default router;
