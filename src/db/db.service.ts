import { Injectable } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { BcryptService } from 'src/auth/strategy/bcrypt.service';
import { User } from './schema/user.schema';

@Injectable()
export class DatabaseService {
  constructor(private readonly bcryptService: BcryptService) {}

  public async get(user: AuthUserDto): Promise<any> {
    return await User.findOne({ username: user.username }).collation({
      locale: 'en',
      strength: 2,
    });
  }

  public async create(user: RegisterUserDto): Promise<boolean> {
    try {
      const userExists = await User.findOne({
        $or: [{ user: user.username }, { email: user.email }],
      });

      if (userExists) return false;

      const newUser = new User({
        username: user.username,
        email: user.email,
        password: await this.bcryptService.hash(user.password),
      });
      await newUser.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
