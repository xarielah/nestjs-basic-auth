import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { MustBeLogged } from './guards/must-be-logged.guard';
import { MustNotBeLogged } from './guards/must-not-be-logged.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(MustNotBeLogged)
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

  @UseGuards(MustNotBeLogged)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() user: RegisterUserDto) {
    return await this.authService.registerUser(user);
  }

  @UseGuards(MustBeLogged)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('logout')
  public async logout(@Res() res: Response) {
    res.cookie('accessToken', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
    });
    return res.send();
  }

  @UseGuards(MustBeLogged)
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  public async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const tokens = await this.authService.refreshUser(
        req.cookies['refreshToken'],
      );

      res.cookie('accessToken', tokens.accessToken);
      return res.json(tokens);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
