import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/schemas/product.schema";
import { CreateProductDto } from "./DTO/create-product.dto";
import { UpdateProductDto } from "./DTO/update-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
    ) { }


    async index(category?: string) {
        if (category) {
            const productsByCategory = await this.productModel.find({ category })
            if (productsByCategory.length === 0)
                throw new NotFoundException(`there is no ${category} category`)
            return productsByCategory
        }
        const products = await this.productModel.find()
        return products
    }

    async details(id: string) {
        const product = await this.productModel.findById(id)
        if (!product)
            throw new NotFoundException("there is no product with such id")
        return product
    }

    async create(createProductDto: CreateProductDto) {
        const newProduct = new this.productModel(createProductDto)
        return newProduct.save()
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true })
        if (!updatedProduct)
            throw new NotFoundException("there is no product with such id")
        return updatedProduct
    }

    async delete(id: string) {
        const deletedProduct = await this.productModel.findByIdAndDelete(id)
        if (!deletedProduct)
            throw new NotFoundException("there is no product with such id")
        return deletedProduct
    }
}