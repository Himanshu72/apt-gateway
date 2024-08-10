import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { JwtService } from './jwt/jwt.service';
import { BlockModule } from './block/block.module';

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
    ]),
    UsersModule,
    BlockModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
