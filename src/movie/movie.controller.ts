import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMoiveDto } from './dto/create-movie.dto';
import { UpdateMoiveDto } from './dto/update-movie.dto';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  getMovies(@Query("title") title?: string) {
    return this.movieService.getManyMovies(title)
  }

  @Get("/:id")
  getMovie(@Param("id") id: string) {
    return this.movieService.getMovieById(+id)
  }

  @Post()
  postMovie(@Body() body: CreateMoiveDto) {
    return this.movieService.createMoive(body)
  }

  @Patch("/:id")
  patchMovie(@Param('id') id: string, @Body() body: UpdateMoiveDto) {
    return this.movieService.updateMovie(+id, body)
  }

  @Delete("/:id")
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(+id)
  }
}
