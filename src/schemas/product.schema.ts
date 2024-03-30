import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
    @Prop({
        required: true,
    })
    productName: string;

    @Prop({
        required: true
    })
    price: number;

    @Prop({
        required: true
    })
    category: string;


    @Prop({
        required: false
    })
    image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)