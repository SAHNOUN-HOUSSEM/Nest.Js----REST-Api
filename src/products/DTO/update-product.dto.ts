import { IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto {
    @IsNotEmpty()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    image?: string;
}