import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import assert from "assert";
import { IsNotEmpty, ValidateNested } from "class-validator";
import * as mongoose from 'mongoose'
import { User } from "src/users/schemas/user.schema";

export type ProfileDocument = Profile & Document

// Child 
@Schema()
export class Profile_Name {
    @Prop({ type: String, default: null })
    first: string

    @Prop({ type: String, default: null })
    middle: string

    @Prop({ type: String, default: null })
    last: string

}

export const Profile_NameSchema = SchemaFactory.createForClass(Profile_Name);
// Parent
@Schema()
export class Profile {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
    user: User

    @Prop({ type: Profile_NameSchema })
    name: Profile_Name

    @Prop({ default: null })
    dob: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)


// export const ProfileSchema = SchemaFactory.createForClass(Profile)
// .pre('aggregate', function(next) {
//     console.log("Pre update one, maybe we can validate from here?")

//     next()
// })

// ProfileSchema.methods.validateName = async function(name) {
//     console.log("Validating name", name, this.name)
//     return null
// }

