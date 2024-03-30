import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserSettings } from 'src/schemas/userSettings.schema';
import { CreateUserSettingsDto } from './DTO/create-userSettings.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(UserSettings.name)
        private readonly userSettingsModel: Model<UserSettings>
    ) { }

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
        const user = await this.userModel.findById(id).populate("userSettings")
        if (!user)
            throw new NotFoundException("there is no user with the specific id")
        return user
    }

    async create(createUserDto: CreateUserDto) {
        const { email } = createUserDto
        const foundUserWithSameEmail = await this.userModel.findOne({ email })
        if (foundUserWithSameEmail) {
            throw new BadRequestException("there is a user with the same email")
        }
        const { userSettings, ...user } = createUserDto
        if (userSettings) {
            const settings = new this.userSettingsModel(userSettings)
            await settings.save()
            const newUser = new this.userModel(user)
            newUser.userSettings = settings
            return newUser.save()
        }
        const newUser = new this.userModel(createUserDto)
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

    async setUserSettings(userId: string, createUserSettingsDto: CreateUserSettingsDto) {
        const user = await this.userModel.findById(userId)
        if (!user)
            throw new NotFoundException("there is no user with the specific id")
        const userSettings = new this.userSettingsModel(createUserSettingsDto)
        const savedUserSettings = await userSettings.save()
        user.userSettings = savedUserSettings
        return user.save()
    }

}
