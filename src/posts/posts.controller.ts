import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// /users/:userId/posts
@Controller('/users/:userId/posts')
export class PostsController {
    // index : GET /users/:userId/posts -- returns all the posts of the specific user
    // create : POST /users/:userId/posts -- add a post to the specific user
    // delete : DELETE /users/:userId/posts/:postId -- delete a specific post from a specific user
    // update : PATCH /users/:userId/posts/:postId -- update a specific post of a specific user

    constructor(
        private readonly postService: PostsService
    ) { }

    // index : GET /users/:userId/posts -- returns all the posts of the specific user
    @Get()
    index(
        @Param("userId") userId: string
    ) {
        const isValidId = mongoose.Types.ObjectId.isValid(userId)
        if (!isValidId)
            throw new NotFoundException("there is no user with such id")
        return this.postService.index(userId)
    }

    // create : POST /users/:userId/posts -- add a post to the specific user
    @Post()
    @UsePipes(ValidationPipe)
    create(
        @Param("userId") userId: string,
        @Body() createPostDto: CreatePostDto
    ) {
        const isValidId = mongoose.Types.ObjectId.isValid(userId)
        if (!isValidId)
            throw new NotFoundException("there is no user with such id")
        return this.postService.create(userId, createPostDto)
    }

    // delete : DELETE /users/:userId/posts/:postId -- delete a specific post from a specific user
    @Delete("/:postId")
    delete(
        @Param("userId") userId: string,
        @Param("postId") postId: string,
    ) {
        const isValidUserId = mongoose.Types.ObjectId.isValid(userId)
        if (!isValidUserId)
            throw new NotFoundException("there is no user with such id")
        const isValidPostId = mongoose.Types.ObjectId.isValid(postId)
        if (!isValidPostId)
            throw new NotFoundException("there is no post with such id")
        return this.postService.delete(userId, postId)
    }

    // update : PATCH /users/:userId/posts/:postId -- update a specific post of a specific user
    @Patch("/:postId")
    update(
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() updatePostDto: UpdatePostDto
    ) {
        const isValidUserId = mongoose.Types.ObjectId.isValid(userId)
        if (!isValidUserId)
            throw new NotFoundException("there is no user with such id")
        const isValidPostId = mongoose.Types.ObjectId.isValid(postId)
        if (!isValidPostId)
            throw new NotFoundException("there is no post with such id")
        return this.postService.update(userId, postId, updatePostDto)
    }
}
