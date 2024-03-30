import { IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    image: string;

}