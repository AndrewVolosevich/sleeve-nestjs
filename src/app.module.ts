import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nestjs:11945510@cluster0.n3mbp.mongodb.net/sleeve-nestjs?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
