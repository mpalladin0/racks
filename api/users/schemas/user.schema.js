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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const profile_schema_1 = require("../../profiles/schemas/profile.schema");
const bcrypt = require("bcrypt");
const application_schema_1 = require("../../unit/schemas/application.schema");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }),
    __metadata("design:type", profile_schema_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UnitApplication',
            unique: false
        }]),
    __metadata("design:type", Array)
], User.prototype, "applications", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User)
    .pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const saltRounds = 14;
        const hashed = await bcrypt.hash(this['password'], saltRounds);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user.schema.js.map