import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() authDto: AuthDto) {
    return this.authService.loginUser(authDto)
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() authDto: AuthDto) {
    return this.authService.registerUser(authDto)
  }
}
