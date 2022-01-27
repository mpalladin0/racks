import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitService } from './unit.service';
import { UnitApplication, UnitApplicationSchema } from './schemas/application.schema';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UnitController } from './unit.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      { name: UnitApplication.name, schema: UnitApplicationSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UnitService],
  exports: [UnitService],
  controllers: [UnitController]
})
export class UnitModule {}
