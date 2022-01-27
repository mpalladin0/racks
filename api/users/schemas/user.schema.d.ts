import * as mongoose from 'mongoose';
import { Profile } from "src/profiles/schemas/profile.schema";
import { UnitApplication } from "src/unit/schemas/application.schema";
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    profile: Profile;
    applications: UnitApplication[];
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any, any>, any, any>;
