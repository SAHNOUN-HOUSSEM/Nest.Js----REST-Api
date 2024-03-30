import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

@Schema()
export class Post {
    @Prop({
        required: true,
        maxlength: 50
    })
    title: string;

    @Prop({
        required: true,
        maxlength: 500
    })
    content: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    author: User
}

export const PostSchema = SchemaFactory.createForClass(Post)