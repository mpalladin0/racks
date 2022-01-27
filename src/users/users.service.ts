import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from 'src/profiles/schemas/profile.schema';
import { UnitApplication, UnitApplicationDocument } from 'src/unit/schemas/application.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(UnitApplication.name) private applicationModel: Model<UnitApplicationDocument>)
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
    console.log("Searching for user by object id", id)
    const user = await this.userModel.findById(id)
      .populate('profile', '-user')
      .populate('applications', '-user')
      // .populate('accounts', '-user')
    //   .populate('payments', '-user')
    //   .populate('transactions', '-user')
    //   .populate('cards', '-user')
    //   .populate('check_deposits', '-user')
    //   .populate('fees', '-user')
    //   .populate('auth', '-user')
    // console.log("User?", user)
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
