import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly uploadDir = path.join(__dirname, '..', '..', '..', 'public', 'uploads');
  private readonly baseUrl = 'http://localhost:3000/public/uploads'; // Adjust as needed for deployment

  constructor() {
    this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
      throw new Error('Failed to initialize upload service');
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; originalName: string; mimetype: string; size: number }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Example allowed types
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(this.uploadDir, uniqueFilename);

    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (error) {
      console.error('Failed to write file to disk:', error);
      throw new BadRequestException('Failed to upload file');
    }

    const fileUrl = `${this.baseUrl}/${uniqueFilename}`;
    return {
      url: fileUrl,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}