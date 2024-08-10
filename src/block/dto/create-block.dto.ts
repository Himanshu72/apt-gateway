import { IsNotEmpty, IsString } from "class-validator";

export class BlockDto {
    @IsString()
    @IsNotEmpty()
    blockUsername: string;
}

