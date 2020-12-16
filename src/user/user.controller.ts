import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

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
  getUserInfo(@Request() req) {
    return this.userService.getUserInfo(req)
  }
}
