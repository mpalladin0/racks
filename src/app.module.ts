import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { UnitModule } from './unit/unit.module';
import { EventsModule } from './events/events.module';
import { RawBodyMiddleware } from './RawBodyMiddleware';
import { JsonBodyMiddleware } from './users/JsonBodyMiddleware';
import { RouteInfo } from '@nestjs/common/interfaces';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:password1234@cluster0.sn1c8.mongodb.net/dev?retryWrites=true&w=majority', {
    connectionFactory: (connection) => {
      connection.plugin(require('mongoose-autopopulate'));
      return connection
    }
  }), 
    UsersModule, 
    ProfilesModule, 
    UnitModule,
    AuthModule,
    EventsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(RawBodyMiddleware)
        .forRoutes(...rawBodyParsingRoutes)
        .apply(JsonBodyMiddleware)
        .exclude(...rawBodyParsingRoutes)
        .forRoutes('*')
        // .apply(MyOtherMiddleware)
        // .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}

const rawBodyParsingRoutes: Array<RouteInfo> = [
  {
    path: '*src/unit/*',
    method: RequestMethod.POST,
  },
]
