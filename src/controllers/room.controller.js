import roomModel from "../model/rooms.model.js";

export const addRooms = async (req, res) => {

    const user = req.user;

    if (user.role !== "admin") {
        return res.status(401).json({
            message: "Unathorized Person can not add rooms!!!"
        });
    }

    const { roomNumber, roomType, member } = req.body;

    const isRoomAlreayExist = await roomModel.findOne({ roomNumber });

    if (isRoomAlreayExist) {
        return res.status(401).json({
            message: "Room already exist with this room number"
        });
    }

    const room = await roomModel.create({
        roomNumber,
        roomType,
        member
    });

    return res.status(201).json({
        message: "Room created successfully",
        room
    });
}

export const deleteRooms = async (req, res) => {

    const user = req.user;

    if (user.role !== "admin") {
        return res.status(401).json({
            message: "Unathorized Person can not add rooms!!!"
        });
    }

    const roomId = req.params.roomId;

    const room = await roomModel.findByIdAndDelete(roomId);

    if (!room) {
        return res.status(401).json({
            message: "Room Not Found"
        });
    }
    else {
        return res.status(201).json({
            message: "Room deleted successfully"
        });
    }
}