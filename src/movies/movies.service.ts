import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMovieDto } from './dto/update-movies.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Movie } from './entities/movie.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class MoviesService {

  private readonly logger = new Logger('MoviesService');

  constructor(

    @InjectRepository(Movie)
    private readonly MovieRepository: Repository<Movie>,

  ) {}



  async create(createMovieDto: CreateMovieDto) {
    
    try {

      const movie = this.MovieRepository.create(createMovieDto);
      await this.MovieRepository.save( movie );

      return movie;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }


  findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.MovieRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    })
  }

  async findOne( term: string ) {

    let movie: Movie;

    if ( isUUID(term) ) {
      movie = await this.MovieRepository.findOneBy({ id: term });
    }

    if ( !movie ) 
      throw new NotFoundException(`movie with ${ term } not found`);

    return movie;
  }

  async update( id: string, updateMovieDto: UpdateMovieDto ) {

    const movie = await this.MovieRepository.preload({
      id: id,
      ...updateMovieDto
    });

    if ( !movie ) throw new NotFoundException(`movie with id: ${ id } not found`);

    try {
      await this.MovieRepository.save( movie );
      return movie;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const movie = await this.findOne( id );
    await this.MovieRepository.remove( movie );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
