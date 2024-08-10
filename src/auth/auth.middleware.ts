import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];

    try {
      await this.jwtService.verify(token)
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
