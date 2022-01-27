import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @ApiProperty()
    firstname: string

    @ApiProperty()
    lastname: string

    @ApiProperty()
    phone: number

    @ApiProperty()
    dob: string
}
