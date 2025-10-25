import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'some-jwt-token', description: 'Password reset token received via email' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'newSecurePassword456', description: 'New password for the user' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}