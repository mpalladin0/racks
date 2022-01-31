import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { UnitModule } from './unit/unit.module';
import { EventsModule } from './events/events.module';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/mongoose';
import { User, UserDocument, UserSchema } from './users/schemas/user.schema';
import { Model } from 'mongoose';
import { MongooseSchemasModule } from './mongoose-schemas-module/mongoose-schemas-module.module';
import AdminJS from 'adminjs';

AdminJS.registerAdapter({ Database, Resource });
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:password1234@cluster0.sn1c8.mongodb.net/dev?retryWrites=true&w=majority', {
    }),
    AdminModule.createAdminAsync({
      imports: [
        MongooseSchemasModule
      ],
      inject: [
        getModelToken('User')
      ],
      useFactory: (userModel: Model<User>) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            { resource: userModel }
          ]
        }
      })
    }),
    MongooseSchemasModule,
    UsersModule, 
    ProfilesModule, 
    UnitModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
