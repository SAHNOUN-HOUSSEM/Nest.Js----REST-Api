import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./userSettings.schema";
import { Post } from "./post.schema";

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

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Post.name
        }]
    })
    posts: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User)