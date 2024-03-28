import { Injectable } from '@nestjs/common';

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
        if (role)
            return this.users.filter(user => user.role == role)
        return this.users
    }

    findOne(id: number) {
        return this.users.find(user => user.id == id)
    }

    create(user: { name: string, email: string, role: string }) {
        const id = this.users.length + 1
        const newUser = { id, ...user }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, user: { name?: string, email?: string, role?: string }) {
        this.users = this.users.map(u =>
            u.id == id ? { ...u, ...user, } : u
        )
        const updatedUser = this.users.find(user => user.id == id)
        return updatedUser
    }

    delete(id: number) {
        const deletedUser = this.users.find(u => u.id == id)
        this.users = this.users.filter(user => user.id != id)
        return deletedUser
    }

}
