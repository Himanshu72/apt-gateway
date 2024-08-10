import { IsString, IsNumber} from "class-validator";

export class SearchUserDTO {
    @IsString()
    username: string;

    @IsNumber()
    maxAge: number;

    @IsNumber()
    minAge: number;
  }
