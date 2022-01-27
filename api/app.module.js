"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const profiles_module_1 = require("./profiles/profiles.module");
const auth_module_1 = require("./auth/auth.module");
const unit_module_1 = require("./unit/unit.module");
const events_module_1 = require("./events/events.module");
const RawBodyMiddleware_1 = require("./RawBodyMiddleware");
const JsonBodyMiddleware_1 = require("./users/JsonBodyMiddleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(RawBodyMiddleware_1.RawBodyMiddleware)
            .forRoutes(...rawBodyParsingRoutes)
            .apply(JsonBodyMiddleware_1.JsonBodyMiddleware)
            .exclude(...rawBodyParsingRoutes)
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:password1234@cluster0.sn1c8.mongodb.net/dev?retryWrites=true&w=majority', {
                connectionFactory: (connection) => {
                    connection.plugin(require('mongoose-autopopulate'));
                    return connection;
                }
            }),
            users_module_1.UsersModule,
            profiles_module_1.ProfilesModule,
            unit_module_1.UnitModule,
            auth_module_1.AuthModule,
            events_module_1.EventsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
const rawBodyParsingRoutes = [
    {
        path: '*src/unit/*',
        method: common_1.RequestMethod.POST,
    },
];
//# sourceMappingURL=app.module.js.map