import { Router } from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { addRooms, deleteRooms } from "../controllers/room.controller.js";
import { addRoomValidator } from "../validators/room.validator.js";

const roomRouter = Router();

roomRouter.post("/addroom", identifyUser, addRoomValidator, addRooms);

roomRouter.get("/addroom/:roomId", identifyUser, deleteRooms);

export default roomRouter;