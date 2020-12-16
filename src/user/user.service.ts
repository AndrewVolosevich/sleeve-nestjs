import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserInfo(req) {
    if(!req) {
      throw new HttpException('Bad bearer token', HttpStatus.BAD_REQUEST)
    }
    return {
      email: req.user.email,
      id: req.user.id,
      time: req.user.time
    };
  }
}
