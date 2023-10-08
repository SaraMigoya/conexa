import { IsArray, IsOptional,IsString, MinLength 
} from 'class-validator';

//TODO: MODIFICAR LOS CAMPOS SEGUN LAS MOVIES
export class CreateMovieDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

}
