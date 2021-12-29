import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SearchDto {
  @IsNotEmpty() @IsString() searchWord: string;
  @IsOptional() @IsString() pageToken?: string;
}
