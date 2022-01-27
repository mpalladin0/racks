import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { UnitApplication, UnitApplicationDocument } from './schemas/application.schema';
import { Unit } from '@unit-finance/unit-node-sdk';
export declare class UnitService {
    private applicationModel;
    private userModel;
    private usersService;
    unit: Unit;
    constructor(applicationModel: Model<UnitApplicationDocument>, userModel: Model<UserDocument>, usersService: UsersService);
    createApplicationURL(userId: string): Promise<import("mongoose").Document<unknown, any, UnitApplicationDocument> & UnitApplication & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createNewApplication_Unit(userId: string): Promise<any>;
    findApplicationsByUserId(userId: string): Promise<(import("mongoose").Document<unknown, any, UnitApplicationDocument> & UnitApplication & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
