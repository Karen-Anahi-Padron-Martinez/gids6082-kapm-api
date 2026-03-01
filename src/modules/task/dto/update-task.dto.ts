import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateTaskDto{
    @IsString({ message: 'nombre es requerido'})
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    name?: string;

    @IsString({ message: 'nombre es requerido'})
    @IsOptional()
    @MinLength(3)
    @MaxLength(250)
    description?: string;

    @IsOptional()
    @IsBoolean()
    priority?: boolean;
    
    
    

}