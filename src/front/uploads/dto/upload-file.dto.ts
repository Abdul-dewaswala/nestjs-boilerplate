import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponseDto {
  @ApiProperty({ example: 'https://example.com/uploads/unique-filename.jpg', description: 'Publicly accessible URL of the uploaded file' })
  url: string;

  @ApiProperty({ example: 'original-filename.jpg', description: 'Original filename of the uploaded file' })
  originalName: string;

  @ApiProperty({ example: 'image/jpeg', description: 'MIME type of the uploaded file' })
  mimetype: string;

  @ApiProperty({ example: 102400, description: 'Size of the uploaded file in bytes' })
  size: number;
}