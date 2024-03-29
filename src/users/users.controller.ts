import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import mongoose from 'mongoose';

@Controller('users') // /users
export class UsersController {

    constructor(private readonly userService: UsersService) { }


    // GET /users -- get all users
    // GET /users/:id -- get user with specific id
    // POST /users -- create user
    // PUT /users/:id -- update user with specific id
    // DELETE /users/:id -- delete user with specific id

    @Get() // GET /users
    findAll(@Query("role") role?: "ADMIN" | "ENGINEER" | "MANAGER") {
        return this.userService.findAll(role)
    }

    @Get("/:id") // GET /users/:id
    findOne(@Param("id") id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id)
        if (!isValidId)
            throw new NotFoundException("there is no user with the specific id")
        return this.userService.findOne(id)
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Put("/:id") // PUT /users/:id
    update(
        @Param("id") id: string,
        @Body(ValidationPipe) user: UpdateUserDto
    ) {
        const isValidId = mongoose.Types.ObjectId.isValid(id)
        if (!isValidId)
            throw new NotFoundException("there is no user with the specific id")
        return this.userService.update(id, user)
    }

    @Delete("/:id") // DELETE /users/:id
    delete(@Param("id") id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id)
        if (!isValidId)
            throw new NotFoundException("there is no user with the specific id")
        return this.userService.delete(id)
    }

}
