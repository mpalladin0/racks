import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Profile, ProfileSchema } from 'src/profiles/schemas/profile.schema';
import { UnitModule } from 'src/unit/unit.module';
import { UnitApplication, UnitApplicationSchema } from 'src/unit/schemas/application.schema';

@Module({
  imports: [
    UnitModule,
    ProfilesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: UnitApplication.name, schema: UnitApplicationSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],

  /**
   * UsersService: AuthModule
   */
  exports: [UsersService]
})
export class UsersModule {}
