import { Injectable } from '@nestjs/common';
import { MEDIA_BASE_URL } from '../shared/constants';

@Injectable()
export class MediaService {
  async saveImageFile(file: { originalname: string; buffer: Buffer }): Promise<{ url: string }> {
    const filename = `${Date.now()}-${file.originalname}`;
    const url = `${MEDIA_BASE_URL}/${filename}`;
    return { url };
  }

  async serveImage(filename: string): Promise<Buffer> {
    return Buffer.from('');
  }
}