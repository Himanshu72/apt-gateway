import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(userHello:string): string {
    return `->${userHello}`;
  }
}
