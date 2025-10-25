import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [AuthModule, ProfileModule, UploadsModule]
})
export class FrontModule {}
