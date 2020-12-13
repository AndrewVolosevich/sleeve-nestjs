import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    createdUser.time = new Date()
    createdUser.password = await bcrypt.hash(createdUser.password, 10)

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
  async finUserdById(id: string) {
    const findUser = await this.userModel.findById(id);
    return { email: findUser.email, id: findUser.id };
  }
}
