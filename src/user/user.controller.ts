import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign_up')
  async signUp(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Post('sign_in')
  async signIn(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.userService.login(userDto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.finUserById(id);
  }
}
