import { Profile } from "src/profiles/schemas/profile.schema";
export declare class CreateUserDto {
    email: string;
    password: string;
    profile: Profile;
}
