import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

let users = [
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

@Controller('users') // /users
export class UsersController {
    // GET /users -- get all users
    // GET /users/:id -- get user with specific id
    // POST /users -- create user
    // PUT /users/:id -- update user with specific id
    // DELETE /users/:id -- delete user with specific id

    @Get() // GET /users
    findAll() {
        return users;
    }

    @Get("/:id") // GET /users/:id
    findOne(@Param("id") id: number) {
        return users.find(user => user.id == id)
    }

    @Post() //POST /users
    create(@Body() user: { name: string, email: string, role: string }) {
        const id = users.length + 1
        const newUser = { id, ...user }
        users.push(newUser)
        return newUser
    }

    @Put("/:id") // PUT /users/:id
    update(
        @Param("id") id: number,
        @Body() user: { name: string, email: string, role: string }
    ) {
        const updatedUser = { id, ...user }
        users = users.map(u => {
            return u.id == id ? updatedUser : u
        }
        )
        return updatedUser
    }

    @Delete("/:id") // DELETE /users/:id
    delete(@Param("id") id: number) {
        users = users.filter(user => user.id != id)
        return users
    }

}
