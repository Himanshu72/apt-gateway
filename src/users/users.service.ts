import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDTO } from './dto/search-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_MANAGMENT_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}
  
  async create(createUserDto: CreateUserDto) {
   // find and create
   const user =  {...createUserDto, password:  await this.jwtService.hashPassword(createUserDto.password) }
   const userObj = await this.userServiceClient.send('createUser', user).toPromise();
   const token =  this.jwtService.sign(userObj)
   return {
    token,
    userObj
   }
  }


  async login(login: LoginUserDto) {;
    const user =  await this.findOne(login.username)
    const isSame = await this.jwtService.comparePasswords(login.password, user.password)
    if (!isSame) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const token =  this.jwtService.sign(user)
    return {
      token,
      user
     }
  }

  async findOne(username: string) {
    return  await this.userServiceClient.send('getUser', username).toPromise();
  }


  async update( updateUserDto: UpdateUserDto) {
    return  await this.userServiceClient.send('updateUser', updateUserDto).toPromise();
  }

  async remove(username: string) {
      await this.userServiceClient.send('removeUser', username).toPromise();
      return { success: true }
  }

  async search(loginUsername: string, searchUserDto: SearchUserDTO) {
    return await this.userServiceClient.send('searchUser', {username: loginUsername , payload: searchUserDto}).toPromise();
  }
  
}
