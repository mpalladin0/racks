import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { User } from "src/users/schemas/user.schema";

export type ProfileDocument = Profile & Document

@Schema()
export class Profile {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
    user: User

    @Prop({ default: null })
    firstname: string

    @Prop({ default: null })
    lastname: string

    @Prop({ default: null })
    dob: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
