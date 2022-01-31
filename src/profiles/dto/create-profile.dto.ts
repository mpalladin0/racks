import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import * as mongoose from "mongoose"

export class CreateProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    user: mongoose.Schema.Types.ObjectId

    // @ApiProperty()
    // @IsNotEmpty()
    // firstname: string

    // @IsNotEmpty()
    // @ApiProperty()
    // lastname: string

    // @IsNotEmpty()
    // @ApiProperty()
    // dob: string

    // @IsNotEmpty()
    // @IsPhoneNumber("US")
    // @ApiProperty()
    // phone: number
    
}
