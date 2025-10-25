import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { User } from '../../models/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [ProfileController],
  providers: [ProfileService, JwtAuthGuard, JwtStrategy],
  exports: [ProfileService],
})
export class ProfileModule {}
