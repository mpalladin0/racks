import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Profile, ProfileSchema } from "src/profiles/schemas/profile.schema";
import * as bcrypt from 'bcrypt';
import { Type } from "class-transformer";
import { User } from "src/users/schemas/user.schema";

export type UnitCustomerDocument = UnitCustomer & Document

@Schema()
export class UnitCustomer extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false })
    user: User

    @Prop({ default: null, enum: ["individual", "customer" ]})
    type: string

    // findByType: Function

    // @Prop({ required: true, unique: true })
    // unitId: string
    
    // @Prop({ required: true, unique: true, default: null })
    // url: string

    // @Prop({ default: null, enum: ["denied", "awaitingDocuments", "pendingReview", "created"] })
    // status: string

    // @Prop({ default: null, enum: ["individual", "business"] })
    // type: string

    // @Prop({ default: null })
    // createdAt: string

}

export const UnitCustomerSchema = SchemaFactory.createForClass(UnitCustomer)