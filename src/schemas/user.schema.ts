import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./userSettings.schema";

@Schema()
export class User {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        unique: true
    }) email: string;

    @Prop({
        enum: ["ADMIN", "ENGINEER", "MANAGER"],
        default: "ENGINEER"
    })
    role: "ADMIN" | "ENGINEER" | "MANAGER"

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: UserSettings.name
    })
    userSettings: UserSettings
}

export const UserSchema = SchemaFactory.createForClass(User)