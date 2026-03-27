import { IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDto {
    @IsOptional()
    @IsString({message: 'Debe de ser una cadena'})
    @MinLength(3, {message: 'Debe de tener al menos 3 caracteres'})
    name?: string;

    @IsOptional()
    @IsString({message: 'Debe de ser una cadena'})
    @MinLength(3, {message: 'Debe de tener al menos 3 caracteres'})
    lastname?: string;

    @IsOptional()
    @IsString({message: 'Debe de ser una cadena'})
    @MinLength(3, {message: 'Debe de tener al menos 3 caracteres'})
    username?: string;

    @IsOptional()
    @IsString({message: 'Debe de ser una cadena'})
    @MinLength(6, {message: 'Debe de tener al menos 6 caracteres'})
    password?: string;
}