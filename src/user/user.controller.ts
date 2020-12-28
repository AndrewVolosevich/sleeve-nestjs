import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminDto } from './userDto/admin.dto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@Request() req) {
    return this.userService.getUserInfo(req)
  }

  @Post('admin')
  async addAdmin(@Body() adminDto: AdminDto) {
    return this.userService.addAdmin(adminDto)
  }
}
