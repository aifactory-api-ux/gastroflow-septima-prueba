import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../shared/constants';
import { hashPassword, verifyPassword, generateUUID } from '../shared/utils';
import * as jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET, JWT_SECRET } from '../shared/constants';

@Injectable()
export class AuthService {
  private adminUser = {
    id: generateUUID(),
    email: ADMIN_EMAIL,
    password: hashPassword(ADMIN_PASSWORD),
    role: 'admin',
  };

  async validateUser(email: string, password: string): Promise<{ id: string; email: string; role: string } | null> {
    if (email === this.adminUser.email) {
      if (verifyPassword(password, this.adminUser.password)) {
        return { id: this.adminUser.id, email: this.adminUser.email, role: this.adminUser.role };
      }
    }
    return null;
  }

  async login(email: string, password: string): Promise<TokenResponseDto> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { sub: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    return { accessToken, refreshToken };
  }
}