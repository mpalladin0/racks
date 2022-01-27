import { Model } from 'mongoose';
import { ProfileDocument } from 'src/profiles/schemas/profile.schema';
import { UnitApplicationDocument } from 'src/unit/schemas/application.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    private profileModel;
    private applicationModel;
    constructor(userModel: Model<UserDocument>, profileModel: Model<ProfileDocument>, applicationModel: Model<UnitApplicationDocument>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<(import("mongoose").Document<unknown, any, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(username: string): Promise<any | undefined>;
    findOneById(id: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
