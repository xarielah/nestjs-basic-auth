import { Module } from '@nestjs/common';
import { BcryptService } from 'src/auth/strategy/bcrypt.service';
import { TokenService } from 'src/token/token.service';
import { SessionService } from './session.service';
import { UserService } from './user.service';

@Module({
  exports: [UserService, SessionService],
  providers: [UserService, SessionService, BcryptService, TokenService],
})
export class DatabaseModule {}
