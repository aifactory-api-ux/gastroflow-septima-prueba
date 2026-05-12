import { Controller, Post, Get, Param, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(@Res() res: any): Promise<{ url: string }> {
    const url = await this.mediaService.saveImageFile({} as any);
    return res.status(201).json({ url });
  }

  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: any): Promise<void> {
    const file = await this.mediaService.serveImage(filename);
    res.send(file);
  }
}