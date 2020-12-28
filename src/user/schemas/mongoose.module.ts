
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './admin.schema';
import { UserSchema } from './user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongooseSchemasModule {}