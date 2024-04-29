import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class MustBeLogged implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    try {
      if (request.cookies['accessToken'])
        return await this.tokenService.verify(request.cookies['accessToken']);
      return false;
    } catch (error) {
      return false;
    }
  }
}
