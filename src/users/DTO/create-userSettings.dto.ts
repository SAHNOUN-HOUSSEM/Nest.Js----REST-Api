import { IsBoolean, IsOptional } from "class-validator"

export class CreateUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean

    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean

    @IsOptional()
    @IsBoolean()
    receiveEMails?: boolean

}