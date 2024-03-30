import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post.name)
        private readonly postModel: Model<Post>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async index(userId: string) {
        const user = await this.userModel.findById(userId).populate("posts")
        if (!user)
            throw new NotFoundException("there is no user with such id")
        return user
    }

    async create(
        userId: string,
        createPostDto: CreatePostDto
    ) {
        const user = await this.userModel.findById(userId).populate("posts")
        if (!user)
            throw new NotFoundException("there is no user with such id")
        const newPost = new this.postModel(createPostDto)
        const savedPost = await newPost.save()
        return this.userModel.findByIdAndUpdate(
            userId,
            { $push: { posts: savedPost } },
            { new: true }
        )
    }

    async delete(
        userId: string,
        postId: string
    ) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            userId,
            {
                $pull: { posts: postId }
            },
            { new: true }
        )
        if (!updatedUser)
            throw new NotFoundException("there is no user with such id")
        const deletedPost = await this.postModel.findByIdAndDelete(postId)
        if (!deletedPost)
            throw new NotFoundException("there is no post with such id")
        return deletedPost
    }

    async update(
        userId: string,
        postId: string,
        updatePostDto: UpdatePostDto
    ) {
        const user = await this.userModel.findById(userId).populate("posts")
        if (!user)
            throw new NotFoundException("there is no user with such id")
        const updatedPost = await this.postModel.findByIdAndUpdate(postId, updatePostDto, { new: true })
        if (!updatedPost)
            throw new NotFoundException("there is no post with such id")
        return updatedPost
    }

}
