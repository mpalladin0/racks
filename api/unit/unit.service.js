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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const users_service_1 = require("../users/users.service");
const application_schema_1 = require("./schemas/application.schema");
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTAxLTE5VDE0OjQyOjE5LjgxNloiLCJqdGkiOiIxMTM5MzgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSIsIm9yZyI6IkJvb20iLCJzb3VyY2VJcCI6IiIsInVzZXJUeXBlIjoib3JnIiwiaXNVbml0UGlsb3QiOmZhbHNlfQOA6c2G-KwN3Xwyzwhjw8O5ReUVFSeoOvb_EsZgDN4-JmrmJ4A5ze4cOXBzgn8gqb1a-50jpt6i8JvRo0whVAc';
const UNIT_API_URL = 'https://api.s.unit.sh/';
let UnitService = class UnitService {
    constructor(applicationModel, userModel, usersService) {
        this.applicationModel = applicationModel;
        this.userModel = userModel;
        this.usersService = usersService;
        this.unit = new unit_node_sdk_1.Unit(UNIT_TOKEN, UNIT_API_URL);
    }
    async createApplicationURL(userId) {
        const user = await this.userModel.findOne({ "id": userId });
        const { data } = await this.createNewApplication_Unit(user.id);
        console.log(data);
        const application = await new this.applicationModel({
            "user": userId,
            "url": data.attributes.url,
            "unitId": data.id
        }).save();
        await user.updateOne({ "$push": { "applications": application.id } }).exec();
        await application.save();
        await user.save();
        return application.save();
    }
    async createNewApplication_Unit(userId) {
        let createApplicationFormRequest = {
            type: 'applicationForm',
            attributes: {
                applicantDetails: {
                    "ssn": "000000002",
                    "fullName": this.unit.helpers.createFullName("Richard", "Hendricks"),
                    "dateOfBirth": "2001-08-10",
                    "address": this.unit.helpers.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
                    "email": "april@baxter.com",
                    "phone": this.unit.helpers.createPhone("1", "2025550158"),
                    "ein": "123456789",
                    "dba": "Pied Piper Inc",
                },
                tags: {
                    "internal_userId": userId
                }
            },
        };
        let application = this.unit.applicationForms.create(createApplicationFormRequest)
            .catch(err => {
            return err;
        });
        return application;
    }
    async findApplicationsByUserId(userId) {
        return await this.applicationModel.find({ "user": userId }).exec();
    }
};
UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(application_schema_1.UnitApplication.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], UnitService);
exports.UnitService = UnitService;
//# sourceMappingURL=unit.service.js.map