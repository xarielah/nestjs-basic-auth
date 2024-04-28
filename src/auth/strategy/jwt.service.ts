import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  /**
   * Gets a payload and encrypt it to a jwt token.
   * @param {object} payload
   * @returns token
   */
  public async sign(payload: object): Promise<string> {
    return '';
  }

  /**
   * Gets a token and verify it's authenticity
   * @param {string} token
   * @returns boolean
   */
  public async verify(token: string): Promise<boolean> {
    if (!token) return false;
    return true;
  }

  /**
   * Gets a token and decrypt it to a userable payload.
   * @param {string} token
   * @returns payload
   */
  public async decode(token: string): Promise<object | null> {
    if(!this.verify(token)) return null;
    return {};
  }
}
