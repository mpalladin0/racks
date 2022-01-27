import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<User | null> {

        const user = await this.usersService.findOne(username)

        if (user) {
            // console.log("User found", user.password)
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                console.log("Passwords match")
                const { password, ...result } = user
                return result
            } else {
                return null
            }
        } 

        return null
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        const token = this.jwtService.sign(payload)
        const userId = user._doc._id.toString()
            
        return {
            access_token: token,
            id: userId
        }
    }
}
