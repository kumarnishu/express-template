import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./types";

const UserSchema = new mongoose.Schema<IUser, mongoose.Model<IUser, {}, { comparePassword: (password: string) => boolean }>, {}, {}>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// middleware
UserSchema.pre('save', async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)
});


// Compare Password
UserSchema.method("comparePassword", function (password: string) {
    return bcrypt.compare(password, this.password);
})

export const User = mongoose.model<IUser, mongoose.Model<IUser, {}, { comparePassword: (password: string) => boolean }>, {}>('User', UserSchema);