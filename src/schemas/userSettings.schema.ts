import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings {
    @Prop({
        required: false,
    })
    receiveNotifications?: boolean;

    @Prop({
        required: false,
    })
    receiveSMS?: boolean;

    @Prop({
        required: false,
    })
    receiveEMails?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings)