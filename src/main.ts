import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAdminPanel } from './setup-admin-panel';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupAdminPanel(app);
  await app.listen(3033);
}
bootstrap();
