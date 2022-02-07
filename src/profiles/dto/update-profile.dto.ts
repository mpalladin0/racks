import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, validate, ValidateNested} from 'class-validator';
import { Profile_Name } from '../schemas/profile.schema';
import { CreateProfileDto } from './create-profile.dto';


class Name {
    // @IsOptional({ always: true })
    // @IsNotEmpty()
    // @IsString()
    first: string

    // @IsOptional({ always: true })
    // @IsNotEmpty()
    // @IsString()
    middle: string

    // @IsOptional({ always: true })
    // @IsNotEmpty()
    // @IsString()
    last: string
}

export class UpdateProfileDto {
    @ApiProperty()
    name: Name

    @ApiProperty()
    // @IsOptional({ always: true })
    // @IsNotEmpty()
    // @IsNumber()
    phone: number

    @ApiProperty()
    // @IsOptional({ always: true })
    // @IsDate()
    dob: string
}
