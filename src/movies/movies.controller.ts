import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMovieDto } from './dto/update-movies.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('Movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.MoviesService.create(createMovieDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.MoviesService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
    return this.MoviesService.findOne( term );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.MoviesService.update( id, updateMovieDto );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.MoviesService.remove( id );
  }
}
