import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() user: AuthUserDto, @Res() res: Response) {
    const tokens = await this.authService.loginUser(user);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.json(tokens);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() user: RegisterUserDto) {
    return await this.authService.registerUser(user);
  }

  @Post('logout')
  public async logout(@Req() req: Request) {
    console.log(req);
    return 'logout';
  }

  @Post('refresh')
  public async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refreshUser(req.cookies['refreshToken']);
  }
}
