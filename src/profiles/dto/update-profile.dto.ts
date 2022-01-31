import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';


// class Name {
//     @IsOptional({ always: true })
//     @IsNotEmpty()
//     @IsString()
//     first: string

//     @IsOptional({ always: true })
//     @IsNotEmpty()
//     @IsString()
//     middle: string

//     @IsOptional({ always: true })
//     @IsNotEmpty()
//     @IsString()
//     last: string
// }
export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    // constructor() {
    //     super()

    //     this.runValidation()
    // }

    // name: string

    // private async runValidation() {
    //     console.log("Running validation...", super.user, this.name)

    // }

    // @ApiProperty()
    // private name: {
    //     first: 
    // }



    // @ApiProperty()
    // @IsOptional({ always: true })
    // @IsNotEmpty()
    // @IsString()
    // lastname: string

    @ApiProperty()
    @IsOptional({ always: true })
    @IsNotEmpty()
    @IsNumber()
    phone: number

    @ApiProperty()
    @IsOptional({ always: true })
    @IsDate()
    dob: string
}
