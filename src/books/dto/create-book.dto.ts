import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Name of the book',
    example: 'title',
  })
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'genre',
    example: ['drama'],
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  genre: string[];
}
