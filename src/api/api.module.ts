import { Module } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { ApiController } from './api.controller';

@Module({
  controllers: [ApiController],
  providers: [TokenService],
})
export class ApiModule {}
