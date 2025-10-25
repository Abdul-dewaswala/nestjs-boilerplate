import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { UploadFileResponseDto } from './dto/upload-file.dto';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully', type: UploadFileResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid file type or no file uploaded' })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadsService.uploadFile(file);
  }
}