import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [AuthModule, DatabaseModule, DemoModule, ConfigModule.forRoot()],
})
export class AppModule {}
