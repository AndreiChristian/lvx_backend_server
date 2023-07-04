import express, { Request, RequestHandler, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { websocket } from "./websocket/websocket";

import propertiesRouter from "./routes/properties";
import facilitiesRouter from "./routes/facility";
import regionsRouter from "./routes/region";
import adressRouter from "./routes/adress";
import guestsRouter from "./routes/guests";
import profilesRouter from "./routes/profiles";
import guestsProfilesRouter from "./routes/guests_profiles";
import employeesRouter from "./routes/employees";
import reservationsRouter from "./routes/reservation";
import profileFacilityRouter from "./routes/profile_facility";
import facilityCategoryRouter from "./routes/facilities_category";
import facilitySubcategoryRouter from "./routes/facilities_subcategory";
import authRouter from "./routes/auth";
import reservationProfilesRoutes from "./routes/reservation_profiles";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json() as RequestHandler);

app.use("/api", propertiesRouter);
app.use("/api", facilitiesRouter);
app.use("/api", regionsRouter);
app.use("/api", adressRouter);
app.use("/api", guestsRouter);
app.use("/api", profilesRouter);
app.use("/api", guestsProfilesRouter);
app.use("/api", employeesRouter);
app.use("/api", reservationsRouter);
app.use("/api", profileFacilityRouter);
app.use("/api", facilityCategoryRouter);
app.use("/api", facilitySubcategoryRouter);
app.use("/api", reservationProfilesRoutes);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "it works" });
});

const port = process.env.PORT || 3000;

const server = app.listen(+port, "0.0.0.0", () => {
  console.log("running on port", port);
});

const io = websocket.init(server);

io.on("connection", (socket: Socket) => {
  console.log("client connected");
});
