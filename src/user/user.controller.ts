import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('/create')
    async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.addUser(createUserDto);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully created',
            user
        });
    }

    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const user = await this.userService.deleteUser(userID);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully deleted',
            user
        });
    }

    @Put('/')
    async updateUser(@Res() res, @Body() createUserDto: CreateUserDto, @Query('userID') userID) {
        const user = await this.userService.editUser(userID, createUserDto);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully edited',
            user
        });
    }
}
