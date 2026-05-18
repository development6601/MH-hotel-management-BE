import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already exist"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: ["admin", "customer"],
            message: "Status Only can be admin or customer"
        }
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function() {

    if(!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("Users", userSchema);
export default userModel;