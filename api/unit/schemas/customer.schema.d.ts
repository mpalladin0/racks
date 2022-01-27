import * as mongoose from 'mongoose';
import { User } from "src/users/schemas/user.schema";
export declare type UnitCustomerDocument = UnitCustomer & Document;
export declare class UnitCustomer extends Document {
    user: User;
    type: string;
}
export declare const UnitCustomerSchema: mongoose.Schema<mongoose.Document<UnitCustomer, any, any>, mongoose.Model<mongoose.Document<UnitCustomer, any, any>, any, any, any>, any, any>;
