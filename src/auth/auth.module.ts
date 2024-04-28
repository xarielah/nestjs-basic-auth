import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './strategy/bcrypt.service';
import { JwtService } from './strategy/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [DatabaseService, AuthService, BcryptService, JwtService],
})
export class AuthModule {}
