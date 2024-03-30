import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUserSettingsDto } from "./create-userSettings.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["ADMIN", "ENGINEER", "MANAGER"], {
        message: "you must enter a valid role"
    })
    role: "ADMIN" | "ENGINEER" | "MANAGER"

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    userSettings?: CreateUserSettingsDto
}