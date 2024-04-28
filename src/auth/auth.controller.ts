import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() user: AuthUserDto) {
    return await this.authService.loginUser(user);
  }

  @Post('register')
  public async register(@Body() user: RegisterUserDto) {
    return await this.authService.registerUser(user);
  }

  @Post('logout')
  public async logout(@Req() req: Request) {
    console.log(req);
    return 'logout';
  }
}
