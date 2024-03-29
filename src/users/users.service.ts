import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: "john@gmail.com",
            role: "ADMIN"
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: "jane@gmail.com",
            role: "ENGINEER"
        },
        {
            id: 3,
            name: 'Jim Doe',
            email: "jim@gmail.com",
            role: "MANAGER"
        },
        {
            id: 4,
            name: 'Jack Doe',
            email: "jack@gmail.com",
            role: "ADMIN"
        },
    ]


    async findAll(role?: "ADMIN" | "ENGINEER" | "MANAGER") {
        if (role) {
            const users = await this.userModel.find({ role })
            if (users.length === 0)
                throw new HttpException("wrong role", 400)
        }
        const users = await this.userModel.find()
        return users
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id)
        if (!user)
            throw new NotFoundException("there is no user with the specific id")
        return user
    }

    create(user: CreateUserDto) {
        const newUser = new this.userModel(user)
        return newUser.save()
    }

    async update(id: string, user: UpdateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true })
        if (!updatedUser)
            throw new NotFoundException("there is no user with the specific id")
        return updatedUser
    }

    async delete(id: string) {
        const deletedUser = await this.userModel.findByIdAndDelete(id)
        if (!deletedUser)
            throw new NotFoundException("there is no user with the specific id")
        return deletedUser
    }

}
