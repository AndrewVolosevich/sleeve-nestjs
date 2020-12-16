import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  private createToken(payload: {
    email: string,
    id: string
  }) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET
    });
  }

  async loginUser(authDto: AuthDto) {
    const candidate = await this.userModel.findOne({ email: authDto.email })
    if (!candidate) {
      throw new HttpException('No such user', HttpStatus.BAD_REQUEST)
    }

    const isExact = await bcrypt.compare(
      authDto.password,
      candidate.password
    )
    if (!isExact) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
    }

    const payload = {id: candidate.id, email: candidate.email}
    return {
      email: candidate.email,
      id: candidate.id,
      time: candidate.time,
      token: this.createToken(payload)
    }
  }

  async registerUser(authDto: AuthDto) {
    const candidate = await this.userModel.findOne({ email: authDto.email }).exec()
    if (candidate) {
      throw new HttpException('Already registered', HttpStatus.CONFLICT);
    }

    const createdUser = await new this.userModel(authDto);
    if (!createdUser) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    createdUser.time = new Date()
    createdUser.password = await bcrypt.hash(createdUser.password, 10)
    await createdUser.save();

    const payload = {id: createdUser.id, email: createdUser.email}
    return {
        email: createdUser.email,
        id: createdUser.id,
        time: createdUser.time,
        token: this.createToken(payload)
      };
  }
}
