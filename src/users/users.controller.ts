import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,  private readonly jwtService: JwtService) {}


  @Post('signup')
  signup(@Body()createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Post('login')
  login(@Body()loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto)
  }

  @Get()
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }


  @Get("search")
  async search( @Headers('authorization') authHeader: string, @Query('minAge') minAge?: number, @Query('maxAge') maxAge?: number, @Query('username') username?:string) {
    
    const token = authHeader?.replace('Bearer ', '');
    const userData:any = await this.jwtService.decode(token)
    const loginUsername = userData?.username
    return this.usersService.search(loginUsername, {minAge, maxAge, username});
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':username') // Define the route parameter
  remove(@Param('username') username: string) {
     return this.usersService.remove(username);
  }
}
