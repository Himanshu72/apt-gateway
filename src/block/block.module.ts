import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
 imports: [
    ClientsModule.register([
      {
        name: 'USER_MANAGMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),],
  controllers: [BlockController],
  providers: [BlockService, JwtService],
})
export class BlockModule {}
