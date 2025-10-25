import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL to the user\'s avatar' })
  @IsOptional()
  @IsString()
  avatar?: string;
}