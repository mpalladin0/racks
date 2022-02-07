import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Profile } from "src/profiles/schemas/profile.schema";

export class CreateUserDto {
    constructor(email: string, password: string) {}
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiHideProperty()
    profile: Profile
}


