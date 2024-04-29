import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [AuthModule, DatabaseModule, ApiModule, ConfigModule.forRoot()],
})
export class AppModule {}
