import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

  async create(createProfileDto) {
    const createdProfile = new this.profileModel(createProfileDto)
    return await createdProfile.save()
  }

  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(userId: string) {
    console.log("Searching for profile for ", userId)
    const profile = await this.profileModel.findOne({ "user": userId })
    const {user, ...result} = profile.toJSON()
    return result
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const filter = { user: userId }
    const update = { ...updateProfileDto }
    const settings = { setDefaultsOnInsert: false, returnOriginal: false }

    // await this.profileModel.findOneAndUpdate(filter, update, settings).validate()

    console.log(filter, updateProfileDto)

    return null
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
