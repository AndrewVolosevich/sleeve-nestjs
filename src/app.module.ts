import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from '@admin-bro/nestjs';
import AdminBro from 'admin-bro';
import AdminBroMongoose from '@admin-bro/mongoose';
import { MongooseSchemasModule } from './user/schemas/mongoose.module';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './user/schemas/admin.schema';
import { User, UserDocument } from './user/schemas/user.schema';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    AuthModule,
    // AdminModule.createAdminAsync({
    //   imports: [
    //     MongooseSchemasModule,
    //   ],
    //   inject: [
    //     getModelToken('Admin'),
    //     getModelToken('User'),
    //   ],
    //   useFactory: (
    //     adminModel: Model<AdminDocument>,
    //     userModel: Model<UserDocument>,
    //   ) => ({
    //     adminBroOptions: {
    //       rootPath: '/admin',
    //       resources: [
    //         {resource: adminModel},
    //         {resource: userModel},
    //       ],
    //     },
    //     auth: {
    //       authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
    //       cookieName: 'test',
    //       cookiePassword: 'testPass',
    //     },
    //   }),
    // }),
    MongooseSchemasModule,
  ],
})
export class AppModule {}
