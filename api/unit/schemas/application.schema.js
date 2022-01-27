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
exports.UnitApplicationSchema = exports.UnitApplication = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const profile_schema_1 = require("../../profiles/schemas/profile.schema");
const user_schema_1 = require("../../users/schemas/user.schema");
let UnitApplication = class UnitApplication {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false }),
    __metadata("design:type", user_schema_1.User)
], UnitApplication.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], UnitApplication.prototype, "unitId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, default: null }),
    __metadata("design:type", String)
], UnitApplication.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, enum: ["denied", "awaitingDocuments", "pendingReview", "created"] }),
    __metadata("design:type", String)
], UnitApplication.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, enum: ["individual", "business"] }),
    __metadata("design:type", String)
], UnitApplication.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], UnitApplication.prototype, "createdAt", void 0);
UnitApplication = __decorate([
    (0, mongoose_1.Schema)()
], UnitApplication);
exports.UnitApplication = UnitApplication;
exports.UnitApplicationSchema = mongoose_1.SchemaFactory.createForClass(UnitApplication);
exports.UnitApplicationSchema.methods.updateStatus = function (payload) {
    console.log("Hello from method", payload);
    return null;
};
//# sourceMappingURL=application.schema.js.map