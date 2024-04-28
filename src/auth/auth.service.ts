import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { BcryptService } from './strategy/bcrypt.service';
import { JwtService } from './strategy/jwt.service';
import { LoggedUserPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Implements the user registration business logic.
   * @param {RegisterUserDto} user
   * @returns any
   */
  public async registerUser(user: RegisterUserDto) {
    // If user creation has succeeded, we return a success message.
    if (await this.dbService.create(user))
      return { message: 'User created successfully' };

    // Incase we didn't create the user, we throw an error.
    throw new BadRequestException();
  }

  /**
   * Implements the user login business logic.
   * @param {AuthUserDto} user
   * @returns any
   */
  public async loginUser(user: AuthUserDto): Promise<LoggedUserPayload> {
    const dbUser = await this.dbService.get(user);
    // If the user doesn't exist or the password is incorrect, we throw an error.
    if (
      !dbUser ||
      !(await this.bcryptService.compare(user.password, dbUser.password))
    )
      throw new UnauthorizedException();

    // If the user exists and the password is correct, we serialize payload to a token.
    const token = await this.jwtService.sign({
      username: dbUser.username,
      email: dbUser.email,
      id: dbUser._id,
    });
    return { accessToken: token, refreshToken: 'refresh' };
  }
}
