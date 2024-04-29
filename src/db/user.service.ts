import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { BcryptService } from 'src/auth/strategy/bcrypt.service';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly bcryptService: BcryptService) {}

  /**
   * Gets a user object, with username and password and optional email,
   * returns the user if found, otherwise returns null.
   * @param {Partial<RegisterUserDto>} user
   * @returns User or null
   */
  public async get(user: Partial<RegisterUserDto>): Promise<any> {
    // If the user has an email, we search for the user by username or email.
    if (user.email) {
      return User.findOne({
        $or: [{ username: user.username }, { email: user.email }],
      })
        .collation({ locale: 'en', strength: 2 })
        .exec();
    }
    // Otherwise, we search for the user by username.
    return User.findOne({ username: user.username })
      .collation({ locale: 'en', strength: 2 })
      .exec();
  }

  /**
   * Gets a username, password and email object, and creates a new user.
   * @param {RegisterUserDto} user
   * @returns boolean
   */
  public async create(user: RegisterUserDto): Promise<boolean> {
    try {
      const foundUser = await this.get(user);
      if (foundUser) return false;
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
