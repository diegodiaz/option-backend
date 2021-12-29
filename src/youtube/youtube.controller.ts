import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('api/v1/youtube')
export class YoutubeController {
  constructor(private youtubeService: YoutubeService) {}

  @Post('/search')
  @HttpCode(HttpStatus.OK)
  async search(@Body('searchWord') searchWord: string): Promise<any> {
    return this.youtubeService.search(searchWord);
  }
}
