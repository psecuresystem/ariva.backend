import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/entities/user.entity';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcryptjs';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<User>('save', async function () {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(this.password, salt);

            this.password = hashPassword;
          });
          return schema;
        },
      },
    ]),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [
    AuthRepository,
    JwtModule.register({
      secret:
        'hard!to-guess_secret' /* public key used in asymmetric algorithms (required if non other secrets present) */,
    }),
  ],
})
export class AuthModule {}
