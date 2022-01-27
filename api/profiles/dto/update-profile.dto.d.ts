import { CreateProfileDto } from './create-profile.dto';
declare const UpdateProfileDto_base: import("@nestjs/common").Type<Partial<CreateProfileDto>>;
export declare class UpdateProfileDto extends UpdateProfileDto_base {
    firstname: string;
    lastname: string;
    phone: number;
    dob: string;
}
export {};
