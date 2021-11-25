import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/user.dto";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = await new this.userModel(createUserDto).save();
        return createdUser;
    }

    async deleteUser(userID: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    async editUser(userID: string, createUserDto: CreateUserDto): Promise<User> {
        const editedUser = await this.userModel.findByIdAndUpdate(userID, createUserDto, {new: true});
        return editedUser;
    }
}
