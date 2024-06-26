import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class MustBeVerified implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    try {
      const accessToken = request.cookies['accessToken'];
      if (!accessToken) return false;
      const isVerified = await this.tokenService.verify(
        request.cookies['accessToken'],
      );
      if (!isVerified) return false;
      const payload = await this.tokenService.decodeToken(
        request.cookies['accessToken'],
      );
      if (!payload || !payload.verified) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
