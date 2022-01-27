import * as mongoose from 'mongoose';
import { User } from "src/users/schemas/user.schema";
export declare type UnitApplicationDocument = UnitApplication & Document;
export declare class UnitApplication {
    user: User;
    unitId: string;
    url: string;
    status: string;
    type: string;
    createdAt: string;
}
export declare const UnitApplicationSchema: mongoose.Schema<mongoose.Document<UnitApplication, any, any>, mongoose.Model<mongoose.Document<UnitApplication, any, any>, any, any, any>, any, any>;
