import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./DTO/create-product.dto";
import mongoose from "mongoose";
import { UpdateProductDto } from "./DTO/update-product.dto";

@Controller("/products")
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    // index : GET /products?category=cat
    @Get()
    index(@Query("category") category: string) {
        return this.productsService.index(category)
    }

    // details : GET /products/:id
    @Get("/:id")
    details(@Param("id") id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id)
        if (!isValidId)
            throw new NotFoundException("there is no product with such id")
        return this.productsService.details(id)
    }

    // create : POST /products
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto)
    }

    // update : PATCH /products/:id
    @Patch("/:id")
    @UsePipes(ValidationPipe)
    update(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        const isValidId = mongoose.Types.ObjectId.isValid(id)
        if (!isValidId)
            throw new NotFoundException("there is no product with such id")
        return this.productsService.update(id, updateProductDto)
    }

    // delete : DELETE /products/:id
    @Delete("/:id")
    delete(@Param("id") id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id)
        if (!isValidId)
            throw new NotFoundException("there is no product with such id")
        return this.productsService.delete(id)
    }

}