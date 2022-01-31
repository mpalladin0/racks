import { AdminModule } from '@adminjs/nestjs';
import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

/**
 * For use with AdminJS
 */
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    exports: [MongooseModule]
})
export class MongooseSchemasModule {}
