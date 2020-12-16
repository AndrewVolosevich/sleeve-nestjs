import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/ auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.loginUser(authDto)
  }

  @Post('register')
  async register(@Body() authDto: AuthDto) {
    return this.authService.registerUser(authDto)
  }
}
