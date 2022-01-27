import * as mongoose from 'mongoose';
import { User } from "src/users/schemas/user.schema";
export declare type ProfileDocument = Profile & Document;
export declare class Profile {
    user: User;
    firstname: string;
    lastname: string;
    dob: string;
}
export declare const ProfileSchema: mongoose.Schema<mongoose.Document<Profile, any, any>, mongoose.Model<mongoose.Document<Profile, any, any>, any, any, any>, any, any>;
