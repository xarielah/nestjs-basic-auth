import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionService } from 'src/db/session.service';
import { UserService } from 'src/db/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './strategy/bcrypt.service';
import { TokenModule } from './strategy/token.module';

@Module({
  controllers: [AuthController],
  imports: [
    TokenModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || '', global: true }),
  ],
  providers: [
    UserService,
    AuthService,
    BcryptService,
    SessionService,
    UserService,
  ],
})
export class AuthModule {}
