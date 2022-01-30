import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import assert from "assert";
import { ValidateNested } from "class-validator";
import * as mongoose from 'mongoose'
import { User } from "src/users/schemas/user.schema";

export type ProfileDocument = Profile & Document
@Schema()
export class Profile {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
    user: User

    @Prop(raw({
        first: { 
            type: String, 
            default: null,
            validate: {
                validator: function (v) {
                    return v.test()
                },
                message: 'First name validation failed.'
            }
        },
        middle: { type: String, default: null },
        last: { type: String, default: null }
    }))
    name: Record<string, any>

    @Prop({ default: null })
    dob: string
}


export const ProfileSchema = SchemaFactory.createForClass(Profile)

ProfileSchema.methods.validateName = async function(name) {
    console.log("Validating name", name, this.name)
    return null
}

