import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
// dtos
import { SearchDto } from './dto/search.dto';

@Controller('api/v1/youtube')
export class YoutubeController {
  constructor(private youtubeService: YoutubeService) {}

  @Post('/search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() body: SearchDto): Promise<any> {
    const { searchWord, pageToken } = body;
    return this.youtubeService.search(searchWord, pageToken);
  }
}
