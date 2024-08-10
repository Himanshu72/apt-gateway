import { Headers, Inject, Injectable } from '@nestjs/common';
import { BlockDto } from './dto/create-block.dto';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from 'src/jwt/jwt.service';


@Injectable()
export class BlockService {
  constructor(
    @Inject('USER_MANAGMENT_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}
  async block(blockDto: any,) {
    return  await this.userServiceClient.send('block', blockDto).toPromise();
  }

  async unblock(unBlockDto: any) {
    return  await this.userServiceClient.send('unblock', unBlockDto).toPromise();
  }

  
}
