import { Inject, Module } from '@nestjs/common';
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
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

AdminJS.registerAdapter({ Database, Resource });
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:password1234@cluster0.sn1c8.mongodb.net/dev?retryWrites=true&w=majority', {
    }),
    AdminModule.createAdminAsync({
      imports: [
        MongooseSchemasModule,
        AuthModule,
      ],
      inject: [
        getModelToken('User'),
        AuthService

      ],
      useFactory: (userModel: Model<UserDocument>, authService: AuthService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          version: {
            admin: true,
            app: "0.0.1",
          },
          locale: {
            language: 'en',
            translations: {
              messages: {
                loginWelcome: 'Administration Panel - Login' // the smaller text
            },
            labels: {
                loginWelcome: 'Racks', // this could be your project name
            },
            }
          },
          branding: {
            companyName: 'Racks',
            softwareBrothers: false,
            logo: false,
          },
          resources: [
            { resource: userModel },
            // { resource: null }
          ],
        },
        auth: {
          authenticate: async (email, password) => {
            const user = await authService.validateUser(email, password)
            .catch(err => err = null)
            if (user) {
              return user
            }
            return false
          },
          cookiePassword: 'some-secret-password-used-to-secure-cookie-hc7daso8gv7ds',
          cookieName: 'vds',
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
