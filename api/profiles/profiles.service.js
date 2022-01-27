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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const profile_schema_1 = require("./schemas/profile.schema");
let ProfilesService = class ProfilesService {
    constructor(profileModel) {
        this.profileModel = profileModel;
    }
    async create(createProfileDto) {
        const createdProfile = new this.profileModel(createProfileDto);
        return await createdProfile.save();
    }
    findAll() {
        return `This action returns all profiles`;
    }
    async findOne(userId) {
        console.log("Searching for profile for ", userId);
        const profile = await this.profileModel.findOne({ "user": userId });
        const _a = profile.toJSON(), { user } = _a, result = __rest(_a, ["user"]);
        return result;
    }
    update(id, updateProfileDto) {
        return `This action updates a #${id} profile`;
    }
    remove(id) {
        return `This action removes a #${id} profile`;
    }
};
ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_schema_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProfilesService);
exports.ProfilesService = ProfilesService;
//# sourceMappingURL=profiles.service.js.map