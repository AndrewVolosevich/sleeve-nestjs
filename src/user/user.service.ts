import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AdminDto } from './userDto/admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
) {}

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

  async addAdmin(adminDto: AdminDto) {
    const candidate = await this.adminModel.findOne({ email: adminDto.email }).exec()
    if(candidate) {
      throw new HttpException('Already exist', HttpStatus.CONFLICT)
    }

    const isAuth = adminDto.secret === process.env.JWT_SECRET
    if (!isAuth) {
      throw new HttpException('You dont know secret', HttpStatus.UNAUTHORIZED);
    }

    const createdAdmin = await new this.adminModel({
      email: adminDto.email,
      password: await bcrypt.hash(adminDto.password, 10)
    })
    if (!createdAdmin) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return createdAdmin.save();
  }
}
