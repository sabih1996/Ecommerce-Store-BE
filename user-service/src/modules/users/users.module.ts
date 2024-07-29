import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserRoleLookup } from '@/db/index.export';
import { CryptoHashingService } from '@/shared/crypto.service';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoleLookup]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UserService, CryptoHashingService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
