import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ example: 'userSecurePassword123', description: 'Current password of the user for account deletion' })
  @IsString()
  @MinLength(8)
  password: string;
}