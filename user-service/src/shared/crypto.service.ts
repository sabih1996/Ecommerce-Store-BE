import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';

@Injectable()
export class CryptoHashingService {
  private readonly saltLength = 16;
  private readonly keyLength = 64;

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(this.saltLength).toString('hex');
    const hash = scryptSync(password, salt, this.keyLength).toString('hex');
    return `${salt}:${hash}`;
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const [salt, hash] = hashedPassword.split(':');
    const hashBuffer = scryptSync(password, salt, this.keyLength);
    return hash === hashBuffer.toString('hex');
  }
}
