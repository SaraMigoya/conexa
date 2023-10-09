import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMovieDto } from './dto/update-movies.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
@Controller('Movies')
@Auth()
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.MoviesService.create(createMovieDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.MoviesService.findAll( paginationDto );
  } 

  @Get(':details')
  @Auth( ValidRoles.Regularuser )
  findAllDetails( @Query() paginationDto:PaginationDto ) {
    return this.MoviesService.findAll( paginationDto );
  } 

  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
    return this.MoviesService.findOne( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.MoviesService.update( id, updateMovieDto );
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.MoviesService.remove( id );
  }
}
