import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateBookDto,
  })
  @Post()
  @ApiBadRequestResponse({ description: 'Enter valid information' })
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.booksService.create(createBookDto);
    } catch (er) {
      throw new NotFoundException();
    }
  }

  @Get()
  @ApiResponse({ status: 200, type: CreateBookDto })
  @ApiQuery({
    name: 'limit',
    required: false,
    description:
      'You can search by page and limit it, or just type search to search by title',
    example: '7',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: '2',
  })
  @ApiQuery({
    name: 'pages',
    required: false,
  })
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('pages') pages: number,
  ) {
    try {
      return this.booksService.findAll(limit, page, pages);
    } catch (er) {
      throw new NotFoundException();
    }
  }

  @Get(':id')
  @ApiFoundResponse()
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    try {
      return this.booksService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.booksService.update(+id, updateBookDto);
    } catch (er) {
      throw new NotFoundException(er.message);
    }
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
