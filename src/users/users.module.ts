import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtService } from 'src/jwt/jwt.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({ imports: [
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
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(AuthMiddleware).exclude(
      { path: 'users/signup', method: RequestMethod.POST }, 
      { path: 'users/login', method: RequestMethod.POST }, 
      { path: 'users/search', method: RequestMethod.GET }, 
    )
    .forRoutes('users/*');
}}
