import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDto } from './dto/create-block.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Controller()
export class BlockController {
  constructor(private readonly blockService: BlockService,   private readonly jwtService: JwtService,) {}

  @Post("block")
 async  block(@Body() blockDto: BlockDto, @Headers('authorization') authHeader: string) {
    console.log("knjkn")
    const token = authHeader?.replace('Bearer ', '');
    const toakenData: any = await this.jwtService.decode(token)
    return this.blockService.block({ username :toakenData.username as string, blockUsername:blockDto.blockUsername });
  }

  @Post("unblock")
  async unblock(@Body() blockDto: BlockDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    const toakenData: any = await this.jwtService.decode(token)
    return this.blockService.unblock({ username :toakenData.username as string, blockUsername:blockDto.blockUsername });
  }


}
