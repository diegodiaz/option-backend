import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class YoutubeService {
  constructor(private configService: ConfigService) {}
  async search(searchword: string, page?: string) {
    const GOOGLE_API_KEY = this.configService.get<string>('GOOGLE_API_KEY');
    // initialize the Youtube API library
    const youtube = google.youtube({
      version: 'v3',
      auth: GOOGLE_API_KEY,
    });
    const res: any = await youtube.search.list({
      part: ['id, snippet'],
      q: searchword,
      pageToken: page,
      maxResults: 25,
      type: ['video'],
    });
    if (res) {
      return res.data;
    }
    return null;
  }
}
