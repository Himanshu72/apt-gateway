import { Injectable } from '@nestjs/common';
import * as jwt from  'jsonwebtoken'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtService {
    sign(user: CreateUserDto): string {
        const { username } = user;
        const token = jwt.sign(
            { username}, 
            'temp', 
            { expiresIn: '1h' }
        );
        return token;
    }

    async verify(token: string) {
        try {
            return jwt.verify(token, 'temp');
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async decode(token: string) {
        return await jwt.decode(token);
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      }
    
    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
      }

}
