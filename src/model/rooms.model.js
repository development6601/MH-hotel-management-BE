import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: [true, "Room Number is required"],
        unique: [true, "Romm Number must be unique"]
    },
    roomType: {
        type: String,
        required: [true, "Room Type is required"],
        enum: {
            values: ["OneBed", "TwinBed"],
            message: "Room type Only can be OneBed or TwinBed"
        }
    },
    member: {
        type: Number,
        required: [true, "Number of member is required"],
        enum: {
            values: [2, 4],
            message: "Room type Only can be 2 or 4"
        }
    },
    status: {
        type: String,
        required: [true, "Room status is required"],
        default: "inactive",
        enum: {
            values: ["active", "inactive"],
            message: "Room type Only can be active or inactive"
        },
    }
}, {
    timestamps: true
});

// roomSchema.pre('save', () => {
//     if (this.roomType === 'OneBed') {
//         this.member = 2;
//     }
//     else if (this.roomType === 'TwinBeds') {
//         this.member = 4;
//     }
// });


const roomModel = mongoose.model("Rooms", roomSchema);
export default roomModel;