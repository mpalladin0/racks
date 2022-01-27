import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Profile, ProfileSchema } from "src/profiles/schemas/profile.schema";
import * as bcrypt from 'bcrypt';
import { Type } from "class-transformer";
import { User } from "src/users/schemas/user.schema";

export type UnitApplicationDocument = UnitApplication & Document

@Schema()
export class UnitApplication {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false })
    user: User

    @Prop({ required: true, unique: true })
    unitId: string
    
    @Prop({ required: true, unique: true, default: null })
    url: string

    @Prop({ default: null, enum: ["denied", "awaitingDocuments", "pendingReview", "created"] })
    status: string

    @Prop({ default: null, enum: ["individual", "business"] })
    type: string

    @Prop({ default: null })
    createdAt: string

    // sortByType: Function 

}

export const UnitApplicationSchema = SchemaFactory.createForClass(UnitApplication)

UnitApplicationSchema.methods.updateStatus = function (payload: string) {
    console.log("Hello from method", payload)
    return null
}