import { IsNotEmpty } from "class-validator"

export class CreateMoiveDto {
  
    @IsNotEmpty()
    title: string
    
    @IsNotEmpty()
    genre: string

    @IsNotEmpty()
    detail: string
}