import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Profile.name, schema: ProfileSchema }
  ])],
  providers: [ProfilesService],
  exports: [ProfilesService]
})
export class ProfilesModule {}
