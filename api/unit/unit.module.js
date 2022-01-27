"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const unit_service_1 = require("./unit.service");
const application_schema_1 = require("./schemas/application.schema");
const users_module_1 = require("../users/users.module");
const user_schema_1 = require("../users/schemas/user.schema");
const unit_controller_1 = require("./unit.controller");
let UnitModule = class UnitModule {
};
UnitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            mongoose_1.MongooseModule.forFeature([
                { name: application_schema_1.UnitApplication.name, schema: application_schema_1.UnitApplicationSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema }
            ]),
        ],
        providers: [unit_service_1.UnitService],
        exports: [unit_service_1.UnitService],
        controllers: [unit_controller_1.UnitController]
    })
], UnitModule);
exports.UnitModule = UnitModule;
//# sourceMappingURL=unit.module.js.map