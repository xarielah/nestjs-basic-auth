import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || '', global: true }),
  ],
  exports: [TokenService],
  providers: [TokenService],
})
export class TokenModule {}
