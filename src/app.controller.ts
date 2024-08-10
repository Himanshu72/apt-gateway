import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('USER_MANAGMENT_SERVICE') private readonly userServiceClient: ClientProxy) {}

  @Get()
  async getHello(): Promise<string> {
    const userHello = await this.userServiceClient.send('getHello', '').toPromise();
    return this.appService.getHello(userHello);
  }
}
