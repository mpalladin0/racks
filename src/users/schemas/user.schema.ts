import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Profile, ProfileSchema } from "src/profiles/schemas/profile.schema";
import * as bcrypt from 'bcrypt';
import { Type } from "class-transformer";
import { UnitApplication } from "src/unit/schemas/application.schema";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile'
    })
    profile: Profile

    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UnitApplication',
        unique: false
    }])
    applications: UnitApplication[]

}

export const UserSchema = SchemaFactory.createForClass(User)
.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const saltRounds = 14;
      const hashed = await bcrypt.hash(this['password'], saltRounds);
      this['password'] = hashed;

      return next();
    } catch (err) {
      return next(err);
    }
  });
