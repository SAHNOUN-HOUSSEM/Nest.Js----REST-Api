import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
}

export const UserSchema = SchemaFactory.createForClass(User)