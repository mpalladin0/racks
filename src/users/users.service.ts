import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../profiles/schemas/profile.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>)
    {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto)
    let createProfileDto = { user: user.id }
    const profile = new this.profileModel(createProfileDto)
    user.profile = profile.id

    await user.save()
    await profile.save()

    return user.populate('profile')
  }

  async findAll() {
    return this.userModel.find().exec()
  }

  async findOne(username: string): Promise<any | undefined> {
    console.log("Called findOne")
    const user = await this.userModel.findOne({ "email": username })

    console.log(user)
    return user
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id)
      .populate('profile', '-user')
      .populate('applications', '-user')
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    return `This action updates a #${id} user`;
  }

  async deleteUser(userId: string) {
    return await this.userModel.findOneAndRemove({ userId })
      .catch(err => { return err })
  }
}
