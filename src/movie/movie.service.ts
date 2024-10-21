import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoiveDto } from './dto/create-movie.dto';
import { UpdateMoiveDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }

  async getManyMovies(title?: string) {
    /// 나중에 title 필터 기능 추가하기
    if (!title) {
      return [await this.movieRepository.find(), await this.movieRepository.count()]
    }

    return this.movieRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
    })
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      }
    })

    if (!movie) {
      throw new NotFoundException("존재하지 않는 ID의 영화입니다!")
    }

    return movie
  }

  async createMoive(createMoiveDto: CreateMoiveDto) {
    const movie = await this.movieRepository.save({
      ...createMoiveDto,
      runtime: 100,
    })

    return movie;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMoiveDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      }
    })

    if (!movie) {
      throw new NotFoundException("존재하지 않는 ID의 영화입니다!")
    }

    await this.movieRepository.update(
      { id },
      updateMovieDto
    )

    const newMovie = await this.movieRepository.findOne({
      where: {
        id,
      }
    })

    return newMovie
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      }
    })

    if (!movie) {
      throw new NotFoundException("존재하지 않는 ID의 영화입니다!")
    }

    await this.movieRepository.delete(id)

    return id
  }
}
