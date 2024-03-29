import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';

@Injectable()
export class UsersService {

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


    findAll(role?: "ADMIN" | "ENGINEER" | "MANAGER") {
        if (role) {
            const userByRole = this.users.filter(user => user.role == role)
            if (userByRole.length === 0) throw new NotFoundException("wrong role")
            return userByRole
        }

        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id == id)
        if (!user)
            throw new NotFoundException("there is no user with the specific id")
        return user
    }

    create(user: CreateUserDto) {
        const id = this.users.length + 1
        const newUser = { id, ...user }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, user: UpdateUserDto) {
        this.users = this.users.map(u =>
            u.id == id ? { ...u, ...user, } : u
        )
        const updatedUser = this.users.find(user => user.id == id)
        if (!updatedUser)
            throw new NotFoundException("there is no user with the specific id")
        return updatedUser
    }

    delete(id: number) {
        const deletedUser = this.users.find(u => u.id == id)
        if (!deletedUser)
            throw new NotFoundException("there is no user with the specific id")
        this.users = this.users.filter(user => user.id != id)
        return deletedUser
    }

}
