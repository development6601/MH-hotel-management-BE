import { Router } from "express";
import identifyUser from "../middlewares/authMiddleware.js";
import { addRooms, deleteRooms, updateRoomStatus } from "../controllers/roomController.js";
import { addRoomValidator } from "../validators/roomValidator.js";

const roomRouter = Router();

roomRouter.post('/admin/addRoom', identifyUser, addRoomValidator, addRooms);

roomRouter.get('/admin/updateRoomStatus/:roomId', identifyUser, updateRoomStatus);

roomRouter.get('/admin/deleteRoom/:roomId', identifyUser, deleteRooms);

export default roomRouter;