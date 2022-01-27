"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const profile_schema_1 = require("../profiles/schemas/profile.schema");
const application_schema_1 = require("../unit/schemas/application.schema");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel, profileModel, applicationModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
        this.applicationModel = applicationModel;
    }
    async create(createUserDto) {
        const user = new this.userModel(createUserDto);
        let createProfileDto = { user: user.id };
        const profile = new this.profileModel(createProfileDto);
        user.profile = profile.id;
        await user.save();
        await profile.save();
        return user.populate('profile');
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(username) {
        console.log("Called findOne");
        const user = await this.userModel.findOne({ "email": username });
        console.log(user);
        return user;
    }
    async findOneById(id) {
        console.log("Searching for user by object id", id);
        const user = await this.userModel.findById(id)
            .populate('profile', '-user')
            .populate('applications', '-user');
        return user;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(profile_schema_1.Profile.name)),
    __param(2, (0, mongoose_1.InjectModel)(application_schema_1.UnitApplication.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map