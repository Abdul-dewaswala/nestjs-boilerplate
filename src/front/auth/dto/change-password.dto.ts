import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'currentSecurePassword123', description: 'Current password of the user' })
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty({ example: 'newSecurePassword456', description: 'New password for the user' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}